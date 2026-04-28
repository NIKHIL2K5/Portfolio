import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Project, Experience, Blog, Testimonial, Settings } from '@/models/Portfolio';
 
export const dynamic = 'force-dynamic';

export async function GET() {
  await connectDB();
  
  const [projects, experiences, blogs, testimonials, settings] = await Promise.all([
    Project.find().sort({ order: 1, createdAt: -1 }),
    Experience.find().sort({ order: 1, createdAt: -1 }),
    Blog.find({ status: { $ne: 'draft' } }).sort({ createdAt: -1 }), // Only published/scheduled
    Testimonial.find().sort({ createdAt: -1 }),
    Settings.findOne(),
  ]);

  // Filter out blogs that are scheduled for the future
  const currentBlogs = blogs.filter(blog => {
    if (blog.status === 'scheduled' && blog.scheduledAt) {
      return new Date(blog.scheduledAt) <= new Date();
    }
    return true;
  });

  return NextResponse.json({
    projects,
    experiences,
    blogs: currentBlogs,
    testimonials,
    settings: settings || { stats: { yearsOfExp: "0+", projectsCompleted: "0+", technologiesMastered: "0+" } },
  });
}
