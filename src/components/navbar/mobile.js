"use client";

import { HomeIcon, LibraryBigIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNavbar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-0 z-10 w-full bg-zinc-50/75 backdrop-blur-xs md:hidden dark:bg-zinc-950/75">
      <div className="mx-auto flex max-w-lg border-t-2 py-3">
        <Link
          className={`${pathname !== "/" && "opacity-50"} flex flex-1 flex-col items-center justify-center gap-1`}
          href={"/"}
        >
          <HomeIcon />
          <p className="text-sm">หน้าแรก</p>
        </Link>
        <Link
          className={`${pathname !== "/threads" && "opacity-50"} flex flex-1 flex-col items-center justify-center gap-1`}
          href={"/threads"}
        >
          <LibraryBigIcon />
          <p className="text-sm">เธรด</p>
        </Link>
        {/*  */}
        <Link
          className={`${pathname !== "/profile" && "opacity-50"} flex flex-1 flex-col items-center justify-center gap-1`}
          href={"/profile"}
        >
          <UserIcon />
          <p className="text-sm">โปรไฟล์</p>
        </Link>
      </div>
    </div>
  );
}
