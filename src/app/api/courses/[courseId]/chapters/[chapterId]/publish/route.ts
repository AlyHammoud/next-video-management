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

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId,
      },
    });

    const muxData = await db.muxData.findUnique({
      where: {
        chapterId: chapterId,
      },
    });

    if (
      !chapter ||
      !muxData ||
      !chapter.description ||
      !chapter.videoUrl ||
      !chapter.description
    ) {
      return new NextResponse("Missing required Fields", { status: 400 });
    }

    const publishChapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[publish]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
