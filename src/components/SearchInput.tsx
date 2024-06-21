"use client";

import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useDebounce } from "../../hooks/debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

type Props = {};

export default function SearchInput({}: Props) {
  const [value, setValue] = useState("");
  const debounce = useDebounce(value);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debounce,
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );

    router.push(url);
  }, [debounce, currentCategoryId, router, pathname]);
  return (
    <div className="relative ">
      <SearchIcon className="h-4 w-4 absolute top-3 left-3 text-slate-300" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
        placeholder="Search for a course"
      />
    </div>
  );
}
