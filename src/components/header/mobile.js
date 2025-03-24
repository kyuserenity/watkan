"use client";

import { MenuIcon, PlusSquareIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileHeader() {
  const pathname = usePathname();
  return (
    <div className="flex items-center justify-between border-b-2 p-6 md:hidden">
      <div>
        {pathname.includes("profile") ? (
          <p className="font-kranky text-3xl font-semibold uppercase">
            profile
          </p>
        ) : (
          <p className="font-kranky text-3xl font-semibold uppercase">watkan</p>
        )}
      </div>
      <div className="flex items-center gap-6">
        {pathname.includes("profile") ? (
          <>
            <Link href={"/profile/create"}>
              <PlusSquareIcon className="h-7 w-7" />
            </Link>
            <Link href={"/profile/setting"}>
              <MenuIcon className="h-7 w-7" />
            </Link>
          </>
        ) : (
          <Link href={"/search"}>
            <SearchIcon />
          </Link>
        )}
      </div>
    </div>
  );
}
