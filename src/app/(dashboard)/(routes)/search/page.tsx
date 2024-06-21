import db from "@/lib/db";
import React from "react";
import Categories from "./_components/Categories";
import SearchInput from "@/components/SearchInput";
import { getCourse } from "@/actions/GetCourses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CoursesList from "@/components/CoursesList";

type Props = {
  searchParams: {
    title: string;
    categoryId: string;
  };
};

export default async function SearchPage({ searchParams }: Props) {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourse({
    userId,
    ...searchParams,
  });
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
}
