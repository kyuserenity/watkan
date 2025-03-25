"use client";

import { MenuIcon, PlusSquareIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function MobileHeader() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // ถ้าลากลง (scroll down)
        setIsVisible(false);
      } else {
        // ถ้าลากขึ้น (scroll up)
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
      className={`sticky top-0 z-10 flex items-center justify-between border-b-2 bg-zinc-50/75 p-4 backdrop-blur-xs transition-transform duration-300 lg:hidden dark:bg-zinc-950/75 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
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
