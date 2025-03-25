"use client";

import { ArrowLeftIcon, ArrowUpRightIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setIsVisible(true);

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      router.back();
    }, 300);
  };

  return (
    <div
      className={`bg-background fixed inset-0 z-20 flex items-start justify-center p-8 duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`flex max-h-full w-full max-w-3xl flex-col duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/*  */}
        <form className="flex gap-4">
          <button
            className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-900"
            onClick={closeModal}
            type="button"
          >
            <ArrowLeftIcon />
          </button>
          <input
            className="block w-full rounded-lg bg-zinc-100 px-4 py-3 dark:bg-zinc-900"
            type="search"
            name="s"
            placeholder="ค้นหา..."
            autoComplete="off"
            autoFocus
          />
          <button
            className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-900"
            type="submit"
          >
            <SearchIcon />
          </button>
        </form>
        <div className="mt-4 flex-1 overflow-auto">
          <button className="flex w-full justify-between gap-4 border-b py-4 duration-100 hover:opacity-75 focus-visible:opacity-75 active:opacity-50">
            <p className="flex-1 overflow-hidden text-start text-nowrap overflow-ellipsis">
              คำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหา
            </p>
            <ArrowUpRightIcon />
          </button>
          <button className="flex w-full justify-between gap-4 border-b py-4 duration-100 hover:opacity-75 focus-visible:opacity-75 active:opacity-50">
            <p className="flex-1 overflow-hidden text-start text-nowrap overflow-ellipsis">
              คำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหา
            </p>
            <ArrowUpRightIcon />
          </button>
          <button className="flex w-full justify-between gap-4 border-b py-4 duration-100 hover:opacity-75 focus-visible:opacity-75 active:opacity-50">
            <p className="flex-1 overflow-hidden text-start text-nowrap overflow-ellipsis">
              คำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหา
            </p>
            <ArrowUpRightIcon />
          </button>
          <button className="flex w-full justify-between gap-4 border-b py-4 duration-100 hover:opacity-75 focus-visible:opacity-75 active:opacity-50">
            <p className="flex-1 overflow-hidden text-start text-nowrap overflow-ellipsis">
              คำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหา
            </p>
            <ArrowUpRightIcon />
          </button>
          <button className="flex w-full justify-between gap-4 border-b py-4 duration-100 hover:opacity-75 focus-visible:opacity-75 active:opacity-50">
            <p className="flex-1 overflow-hidden text-start text-nowrap overflow-ellipsis">
              คำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหา
            </p>
            <ArrowUpRightIcon />
          </button>
          <button className="flex w-full justify-between gap-4 border-b py-4 duration-100 hover:opacity-75 focus-visible:opacity-75 active:opacity-50">
            <p className="flex-1 overflow-hidden text-start text-nowrap overflow-ellipsis">
              คำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหา
            </p>
            <ArrowUpRightIcon />
          </button>
          <button className="flex w-full justify-between gap-4 border-b py-4 duration-100 hover:opacity-75 focus-visible:opacity-75 active:opacity-50">
            <p className="flex-1 overflow-hidden text-start text-nowrap overflow-ellipsis">
              คำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหา
            </p>
            <ArrowUpRightIcon />
          </button>
          <button className="flex w-full justify-between gap-4 border-b py-4 duration-100 hover:opacity-75 focus-visible:opacity-75 active:opacity-50">
            <p className="flex-1 overflow-hidden text-start text-nowrap overflow-ellipsis">
              คำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหา
            </p>
            <ArrowUpRightIcon />
          </button>
          <button className="flex w-full justify-between gap-4 border-b py-4 duration-100 hover:opacity-75 focus-visible:opacity-75 active:opacity-50">
            <p className="flex-1 overflow-hidden text-start text-nowrap overflow-ellipsis">
              คำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหา
            </p>
            <ArrowUpRightIcon />
          </button>
          <button className="flex w-full justify-between gap-4 border-b py-4 duration-100 hover:opacity-75 focus-visible:opacity-75 active:opacity-50">
            <p className="flex-1 overflow-hidden text-start text-nowrap overflow-ellipsis">
              คำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหา
            </p>
            <ArrowUpRightIcon />
          </button>
          <button className="flex w-full justify-between gap-4 border-b py-4 duration-100 hover:opacity-75 focus-visible:opacity-75 active:opacity-50">
            <p className="flex-1 overflow-hidden text-start text-nowrap overflow-ellipsis">
              คำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหา
            </p>
            <ArrowUpRightIcon />
          </button>
          <button className="flex w-full justify-between gap-4 border-b py-4 duration-100 hover:opacity-75 focus-visible:opacity-75 active:opacity-50">
            <p className="flex-1 overflow-hidden text-start text-nowrap overflow-ellipsis">
              คำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหา
            </p>
            <ArrowUpRightIcon />
          </button>
          <button className="flex w-full justify-between gap-4 border-b py-4 duration-100 hover:opacity-75 focus-visible:opacity-75 active:opacity-50">
            <p className="flex-1 overflow-hidden text-start text-nowrap overflow-ellipsis">
              คำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหา
            </p>
            <ArrowUpRightIcon />
          </button>
          <button className="flex w-full justify-between gap-4 border-b py-4 duration-100 hover:opacity-75 focus-visible:opacity-75 active:opacity-50">
            <p className="flex-1 overflow-hidden text-start text-nowrap overflow-ellipsis">
              คำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหา
            </p>
            <ArrowUpRightIcon />
          </button>
          <button className="flex w-full justify-between gap-4 border-b py-4 duration-100 hover:opacity-75 focus-visible:opacity-75 active:opacity-50">
            <p className="flex-1 overflow-hidden text-start text-nowrap overflow-ellipsis">
              คำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหาคำค้นหา
            </p>
            <ArrowUpRightIcon />
          </button>
        </div>
        {/*  */}
      </div>
    </div>
  );
}
