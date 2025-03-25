import {
  BellIcon,
  Ellipsis,
  EllipsisIcon,
  PlugIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";

export default function DesktopHeader() {
  return (
    <div className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b bg-zinc-50/75 backdrop-blur-xs not-lg:hidden dark:bg-zinc-950/75">
      <div className="w-60 border-r border-transparent!">
        <p className="font-kranky text-center text-3xl font-semibold uppercase">
          watkan
        </p>
      </div>
      <div className="flex-1 hover:opacity-75 focus-visible:opacity-75 active:opacity-50">
        <Link href={"/search"} draggable={false}>
          <div className="mx-auto flex max-w-4xl justify-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 dark:bg-zinc-900">
            <SearchIcon />
            <p>ค้นหา</p>
          </div>
        </Link>
      </div>
      <div className="flex w-80 justify-end gap-4 pr-4">
        <Link
          className="flex gap-2 rounded-lg bg-zinc-100 px-4 py-2 dark:bg-zinc-900"
          href={"/profile/create"}
        >
          <PlusIcon />
          <p>สร้าง</p>
        </Link>
        <div className="rounded-lg bg-zinc-100 p-2 dark:bg-zinc-900">
          <BellIcon />
        </div>
      </div>
    </div>
  );
}
