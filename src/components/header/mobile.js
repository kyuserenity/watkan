import { SearchIcon } from "lucide-react";
import Link from "next/link";

export default function MobileHeader() {
  return (
    <div className="flex items-center justify-between border-b-2 p-6 md:hidden">
      <div>
        <p className="font-kranky text-3xl font-semibold uppercase">watkan</p>
      </div>
      <div className="flex items-center gap-6">
        <Link href={"/search"}>
          <SearchIcon />
        </Link>
      </div>
    </div>
  );
}
