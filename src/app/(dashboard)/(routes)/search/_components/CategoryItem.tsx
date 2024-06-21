"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React from "react";
import { IconType } from "react-icons/lib";
import qs from "query-string";

type Props = {
  label?: string | null;
  icon?: IconType;
  value?: string | null;
};

export default function CategoryItem({ label, icon: Icon, value }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCtegoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCtegoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: value,
          title: isSelected ? null : value,
        },
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );

    router.push(url);
  };
  return (
    <div>
      <button
        onClick={onClick}
        className={cn(
          "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
          isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
        )}
      >
        {Icon && <Icon size={20} />}
        <div className="truncate">{label}</div>
      </button>
    </div>
  );
}
