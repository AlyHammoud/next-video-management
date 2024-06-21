import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    courseId: string;
    chapterId: string;
  };
};
export async function PATCH(req: NextRequest, { params }: Props) {
  try {
    const { courseId, chapterId } = params;
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const ownCourse = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });
    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const publishChapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId,
      },
      data: {
        isPublished: false,
      },
    });

    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
    });
    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: {
          id: courseId,
          userId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json({});
  } catch (error) {
    console.log("[unpublish]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
