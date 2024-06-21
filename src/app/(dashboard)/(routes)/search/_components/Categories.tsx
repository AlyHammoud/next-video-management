"use client";
import React from "react";

import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
  FcAbout,
  FcCommandLine,
} from "react-icons/fc";
import { Category } from "@prisma/client";
import { IconType } from "react-icons/lib";
import CategoryItem from "./CategoryItem";

type Props = {
  items: Category[];
};

const iconMap: Record<Category["name"], IconType> = {
  Accounting: FcAbout,
  "Computer Science": FcCommandLine,
  Engineering: FcEngineering,
  Filming: FcFilmReel,
  Fitness: FcSportsMode,
  Music: FcMusic,
  Photography: FcFilmReel,
  Sports: FcOldTimeCamera,
};

export default function Categories({ items }: Props) {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
}
