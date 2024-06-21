import { isTeacher } from "@/actions/Teacher";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: { attachementId: string; courseId: string };
  }
) {
  try {
    const { userId } = auth();
    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: { id: params.courseId },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: {
        courseId: params.courseId,
        id: params.attachementId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("ATTACMENT DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
