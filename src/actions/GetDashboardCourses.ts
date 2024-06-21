import db from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { getProgress } from "./GetProgress";

type CourseProgressWithCategory = Course & {
  Category: Category;
  chapters: Chapter[];
  progress: number | null;
};
type DashboardCourses = {
  completedCourses: CourseProgressWithCategory[];
  coursesInPorgress: CourseProgressWithCategory[];
};

export const getDashboardCourses = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    const puerchasedCourses = await db.purchase.findMany({
      where: {
        userId: userId,
      },
      select: {
        course: {
          include: {
            Category: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });

    const courses = puerchasedCourses.map(
      (p) => p.course
    ) as CourseProgressWithCategory[];

    for (let course of courses) {
      const progress = await getProgress(userId, course.id);
      course["progress"] = progress;
    }

    const completedCourses = courses.filter(
      (course) => course.progress === 100
    );
    const coursesInPorgress = courses.filter(
      (course) => (course.progress ?? 0) < 100
    );
    return {
      completedCourses: completedCourses,
      coursesInPorgress: coursesInPorgress,
    };
  } catch (error) {
    console.log("[get Courses error", error);
    return {
      completedCourses: [],
      coursesInPorgress: [],
    };
  }
};
