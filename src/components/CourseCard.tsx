import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "./IconBadge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/formatters";
import { Chapter } from "@prisma/client";
import { redirect } from "next/navigation";
import CoursePorgress from "./CoursePorgress";

type Props = {
  id: string;
  title: string;
  imgUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string | null;
  chapters: Pick<Chapter, "id">[];
};

export default function CourseCard({
  title,
  category,
  chaptersLength,
  id,
  imgUrl,
  price,
  progress,
  chapters,
}: Props) {
  if (!chapters?.[0]) {
    return redirect("/");
  }
  return (
    <Link href={`/courses/${id}/chapters/${chapters?.[0]?.id}`}>
      <div className="group hover:shadow-sm transition-colors overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image fill className="object-cover" alt={title} src={imgUrl} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
        </div>
        {progress !== null ? (
          <CoursePorgress
            variant={progress === 100 ? "success" : "default"}
            size="sm"
            value={progress}
          />
        ) : (
          <p className="text-md md:text-sm font-medium text-slate-700">
            {formatPrice(price)}
          </p>
        )}
      </div>
    </Link>
  );
}
