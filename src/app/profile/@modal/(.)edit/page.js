"use client";

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
      className={`fixed inset-0 z-20 flex items-center justify-center bg-zinc-950/5 p-6 backdrop-blur-xs duration-300 dark:bg-zinc-50/5 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-background flex max-h-full w-full max-w-lg flex-col rounded-lg p-6 duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/*  */}
        <form>
          <p className="text-3xl font-semibold">แก้ไขโปรไฟล์</p>
          <div className="mt-6 grid gap-4">
            <input
              className="w-full rounded-lg bg-zinc-100 px-4 py-2 dark:bg-zinc-900"
              type="search"
              name="s"
              placeholder="ชื่อผู้ใช้..."
              autoFocus
              autoComplete="off"
            />
            <textarea
              className="w-full resize-none rounded-lg bg-zinc-100 px-4 py-2 dark:bg-zinc-900"
              type="search"
              name="s"
              placeholder="แนะนำตัว..."
              rows={3}
              autoFocus
              autoComplete="off"
            />
          </div>
          <button
            className="bg-foreground mt-6 flex w-full items-center justify-center gap-4 rounded-lg p-3 duration-100 hover:bg-zinc-900 dark:hover:bg-zinc-100"
            type="submit"
          >
            <p className="text-background">บันทึก</p>
          </button>
          <button
            className="mt-4 w-full rounded-lg border p-3 duration-100 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            onClick={closeModal}
          >
            <p>ปิด</p>
          </button>
        </form>
        {/*  */}
      </div>
    </div>
  );
}
