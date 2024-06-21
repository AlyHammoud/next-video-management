import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      courseId: string;
      chapterId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const { isCompleted } = await req.json();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const userProgress = await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId: params.chapterId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId,
        chapterId: params.chapterId,
        isCompleted,
      },
    });

    return NextResponse.json(userProgress);
    return NextResponse.json({});
  } catch (error) {
    console.log("[Progress Error]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
