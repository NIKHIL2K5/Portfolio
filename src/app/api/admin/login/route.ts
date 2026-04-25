import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { AdminSession } from '@/models/Portfolio';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    await connectDB();

    const session = await AdminSession.findOne({ token });

    if (!session) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (new Date() > session.expiresAt) {
      await AdminSession.deleteOne({ token });
      return NextResponse.json({ error: 'Token expired' }, { status: 401 });
    }

    // Set auth cookie
    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 60, // 30 minutes
      path: '/',
    });
    
    cookieStore.set('admin_status', 'active', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 60,
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
