import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { db } from '@/db';
import { siteUploads } from '@/db/schema';

export async function POST(request: Request) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('admin_auth');

  if (!authCookie || authCookie.value !== 'true') {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      // Fallback single file check
      const singleFile = formData.get('file') as File | null;
      if (singleFile) {
        files.push(singleFile);
      }
    }

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, message: 'No files uploaded' }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    const uploadedResults: { filename: string; url: string }[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const sanitizedFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const filePath = path.join(uploadsDir, sanitizedFileName);

      await writeFile(filePath, buffer);

      const relativeUrl = `/uploads/${sanitizedFileName}`;

      db.insert(siteUploads)
        .values({
          filename: file.name,
          url: relativeUrl,
          uploaded_at: new Date().toISOString(),
        })
        .run();

      uploadedResults.push({
        filename: file.name,
        url: relativeUrl,
      });
    }

    return NextResponse.json({ success: true, uploaded: uploadedResults, url: uploadedResults[0]?.url });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
