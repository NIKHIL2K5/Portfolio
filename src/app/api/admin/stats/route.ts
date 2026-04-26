import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Project, Experience, Blog } from "@/models/Portfolio";
import Message from "@/models/Message";

export async function GET() {
  try {
    await connectDB();

    const [projectsCount, experienceCount, blogsCount, messagesCount] = await Promise.all([
      Project.countDocuments(),
      Experience.countDocuments(),
      Blog.countDocuments(),
      Message.countDocuments(),
    ]);

    return NextResponse.json({
      stats: {
        projects: projectsCount,
        experience: experienceCount,
        blogs: blogsCount,
        messages: messagesCount,
      }
    });
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
