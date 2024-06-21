import { isTeacher } from "@/actions/Teacher";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export default function layout({ children }: { children: React.ReactNode }) {
  const { userId } = auth();
  if (!isTeacher(userId)) {
    return redirect("/");
  }
  return <>{children}</>;
}
