import { isTeacher } from "@/actions/Teacher";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const isAuthorized = isTeacher(userId);
    const { title } = await req.json();

    if (!userId || !isAuthorized) {
      return (
        new NextResponse("Unauthorized"),
        {
          status: 401,
        }
      );
    }

    const course = await db.course.create({
      data: {
        title,
        userId,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log(["courcses"], error);
    return (
      new NextResponse("Internal Error"),
      {
        status: 500,
      }
    );
  }
}
