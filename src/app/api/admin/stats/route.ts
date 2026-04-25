import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Project, Experience, Blog, AccessRequest } from "@/models/Portfolio";

export async function GET() {
  try {
    await connectDB();

    const [projectsCount, experienceCount, blogsCount, messagesCount] = await Promise.all([
      Project.countDocuments(),
      Experience.countDocuments(),
      Blog.countDocuments(),
      AccessRequest.countDocuments(), // Assuming messages/requests count is this
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
