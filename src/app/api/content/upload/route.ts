import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    const sanitizedFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-0._-]/g, '_')}`;
    const filePath = path.join(uploadsDir, sanitizedFileName);

    await writeFile(filePath, buffer);

    const relativeUrl = `/uploads/${sanitizedFileName}`;

    return NextResponse.json({ success: true, url: relativeUrl });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
