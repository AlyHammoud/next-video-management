"use client";

import { BarChart, Compass, Layout, List, LucideIcon } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";

type Props = {};

type routesTypes = {
  icon: LucideIcon;
  label: string;
  href: string;
};
const guestRoutes: routesTypes[] = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browser",
    href: "/search",
  },
];

const teacherRoutes: routesTypes[] = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];
export default function SidebarRoutes({}: Props) {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes: routesTypes[] = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          href={route.href}
          icon={route.icon}
          label={route.label}
        />
      ))}
    </div>
  );
}
