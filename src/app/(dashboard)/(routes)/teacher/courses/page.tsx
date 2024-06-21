import { auth } from "@clerk/nextjs";
import { columns } from "./_components/Columns";
import { DataTable } from "./_components/DataTable";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { Suspense } from "react";

type Props = {};

const CoursesPage = async (props: Props) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={courses} />
      </div>
    </div>
  );
};
export default CoursesPage;
