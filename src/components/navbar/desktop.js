import {
  HomeIcon,
  LibraryBigIcon,
  MenuIcon,
  PlusSquareIcon,
  Search,
  UserIcon,
} from "lucide-react";
import NavLink from "./desktopLink";

export default async function DesktopNavbar() {
  return (
    <div className="sticky top-0 flex h-screen min-w-60 flex-col border-r-2 not-md:hidden">
      <div className="h-20 border-b-2">
        <p className="font-kranky p-6 text-center text-3xl font-semibold uppercase">
          watkan
        </p>
      </div>

      <div className="grid gap-2 p-6">
        <NavLink href="/" icon={<HomeIcon />} text="หน้าแรก" />

        <NavLink href="/search" icon={<Search />} text="ค้นหา" />

        <NavLink href="/threads" icon={<LibraryBigIcon />} text="เธรด" />

        <NavLink
          href="/profile/create"
          icon={<PlusSquareIcon />}
          text="สร้าง"
        />

        <NavLink href="/profile" icon={<UserIcon />} text="โปรไฟล์" />
      </div>

      <div className="flex-1"></div>

      <div className="grid gap-2 p-6">
        <button className="flex items-center gap-4 rounded-lg p-3 duration-100 hover:bg-zinc-100 focus-visible:bg-zinc-100 active:bg-zinc-200 dark:hover:bg-zinc-900 dark:focus-visible:bg-zinc-900 dark:active:bg-zinc-800">
          <MenuIcon />
          <p>เพิ่มเติม</p>
        </button>
      </div>
    </div>
  );
}
