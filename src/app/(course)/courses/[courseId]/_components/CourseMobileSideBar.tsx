import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { Menu } from "lucide-react";
import React from "react";
import CourseSideBar from "./CourseSideBar";

type Props = {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[];
    })[];
  };
  progressCount: number | null;
};

export default function CourseMobileSideBar({ course, progressCount }: Props) {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <CourseSideBar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
}
