import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Blog } from '@/models/Portfolio';

export async function GET() {
  await connectDB();
  const blogs = await Blog.find().sort({ createdAt: -1 });
  return NextResponse.json({ blogs });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await connectDB();
    const blog = await Blog.create(data);
    return NextResponse.json({ blog });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { _id, ...updateData } = data;
    await connectDB();
    const blog = await Blog.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json({ blog });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

  await connectDB();
  await Blog.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
