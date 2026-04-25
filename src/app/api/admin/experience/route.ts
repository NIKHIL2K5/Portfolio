import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Experience } from '@/models/Portfolio';

export async function GET() {
  await connectDB();
  const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
  return NextResponse.json({ experiences });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await connectDB();
    const experience = await Experience.create(data);
    return NextResponse.json({ experience });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { _id, ...updateData } = data;
    await connectDB();
    const experience = await Experience.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json({ experience });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

  await connectDB();
  await Experience.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
