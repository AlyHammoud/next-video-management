import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      courseId: string;
    };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const hasPublishedChapter = course.chapters.some((c) => c.isPublished);

    if (
      !course.title ||
      !course.description ||
      !course.imgUrl ||
      !hasPublishedChapter ||
      !course.categoryId
    ) {
      return new NextResponse("Missing required Fields", { status: 404 });
    }

    const publishCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishCourse);
  } catch (error) {
    console.log("[course Publish error api]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
