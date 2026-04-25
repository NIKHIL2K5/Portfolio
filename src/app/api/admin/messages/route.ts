import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Message from '@/models/Message';

export async function GET() {
  await connectDB();
  const messages = await Message.find().sort({ createdAt: -1 });
  return NextResponse.json({ messages });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

  await connectDB();
  await Message.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
