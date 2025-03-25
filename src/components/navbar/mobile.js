"use client";

import { HomeIcon, LibraryBigIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function MobileNavbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`fixed bottom-0 left-0 z-10 w-full border-t-2 bg-zinc-50/75 backdrop-blur-xs transition-transform duration-300 lg:hidden dark:bg-zinc-950/75 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-3xl py-3">
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
