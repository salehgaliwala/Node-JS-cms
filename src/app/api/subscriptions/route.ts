import { NextResponse } from 'next/server';
import { db } from '@/db';
import { subscriptions } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, name, plan, reason } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    if (action === 'signup') {
      const existing = db.select().from(subscriptions).where(eq(subscriptions.email, email)).get();

      if (existing) {
        db.update(subscriptions)
          .set({
            status: 'active',
            name: name || existing.name,
            plan: plan || existing.plan,
          })
          .where(eq(subscriptions.email, email))
          .run();
        return NextResponse.json({ success: true, message: 'Subscription reactivated/updated successfully!' });
      } else {
        db.insert(subscriptions)
          .values({
            email,
            name: name || '',
            plan: plan || 'Monthly Offset',
            status: 'active',
            created_at: new Date().toISOString(),
          })
          .run();
        return NextResponse.json({ success: true, message: 'Thank you for subscribing!' });
      }
    } else if (action === 'cancel') {
      const existing = db.select().from(subscriptions).where(eq(subscriptions.email, email)).get();

      if (existing) {
        db.update(subscriptions)
          .set({
            status: 'cancelled',
            cancelled_at: new Date().toISOString(),
            cancel_reason: reason || 'User requested cancellation',
          })
          .where(eq(subscriptions.email, email))
          .run();
        return NextResponse.json({ success: true, message: 'Your subscription has been successfully cancelled.' });
      } else {
        // Record cancellation even if not found in db previously
        db.insert(subscriptions)
          .values({
            email,
            status: 'cancelled',
            created_at: new Date().toISOString(),
            cancelled_at: new Date().toISOString(),
            cancel_reason: reason || 'User requested cancellation',
          })
          .run();
        return NextResponse.json({ success: true, message: 'Cancellation request recorded.' });
      }
    } else {
      return NextResponse.json({ success: false, message: 'Invalid action. Expected signup or cancel.' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
