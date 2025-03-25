"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, icon, text }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const baseClasses = "flex items-center gap-4  rounded-lg p-3 duration-100";
  const activeClasses =
    "bg-foreground text-background hover:bg-zinc-900 focus-visible:bg-zinc-900 active:bg-zinc-800 dark:hover:bg-zinc-100 dark:focus-visible:bg-zinc-100 dark:active:bg-zinc-200";
  const inactiveClasses =
    "hover:bg-zinc-100 focus-visible:bg-zinc-100 active:bg-zinc-200 dark:hover:bg-zinc-900 dark:focus-visible:bg-zinc-900 dark:active:bg-zinc-800";

  return (
    <Link
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      href={href}
    >
      {icon}
      <p>{text}</p>
    </Link>
  );
}
