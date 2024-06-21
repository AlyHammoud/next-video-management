import NavbarRoutes from "@/components/NavbarRoutes";
import { Chapter, Course, UserProgress } from "@prisma/client";
import React from "react";
import CourseMobileSideBar from "./CourseMobileSideBar";

type Props = {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[];
    })[];
  };
  progressCount: number | null;
};

export default function CourseNavbar({ course, progressCount }: Props) {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSideBar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  );
}
