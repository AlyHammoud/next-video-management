"use client";

import { Category, Course } from "@prisma/client";
import React from "react";
import CourseCard from "./CourseCard";

type CourseWithProgressWithCategory = Course & {
  Category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}
export default function CoursesList({ items }: CoursesListProps) {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imgUrl={item.imgUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.Category?.name!}
            chapters={item.chapters}
          />
        ))}
      </div>
      {items.length == 0 && (
        <div className="text-gray-500 text-center mt-56">No courses found</div>
      )}
    </div>
  );
}
