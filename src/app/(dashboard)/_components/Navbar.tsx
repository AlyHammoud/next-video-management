import NavbarRoutes from "@/components/NavbarRoutes";
import MobileSideBar from "./MobileSideBar";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSideBar />
      <NavbarRoutes />
    </div>
  );
}
