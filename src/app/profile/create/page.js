"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setTimeout(() => setIsVisible(true), 10);

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => router.back(), 300);
  };

  const handleSubmit = async (e) => {
    router.push("/profile");
  };

  return (
    <div
      className={`fixed inset-0 z-20 flex items-center justify-center bg-zinc-950/5 p-6 backdrop-blur-xs duration-300 dark:bg-zinc-50/5 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-background flex max-h-full w-full max-w-lg flex-col overflow-auto rounded-lg p-6 duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/*  */}
        <h1 className="text-3xl font-semibold">สร้างโพสต์</h1>
        <form className="mt-6">
          <div>
            <label>
              <div className="flex aspect-square cursor-pointer items-center justify-center rounded-lg bg-zinc-100 duration-100 hover:bg-zinc-200 focus-visible:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800 dark:active:bg-zinc-700">
                <p className="opacity-65">คลิกเพื่อเลือกรูปภาพ</p>
              </div>
              <input type="file" hidden />
            </label>
          </div>
          <div className="mt-4 rounded-lg bg-zinc-100 duration-100 hover:bg-zinc-200 focus-visible:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800 dark:active:bg-zinc-700">
            <textarea
              className="w-full resize-none px-4 py-2"
              rows={5}
              placeholder="รายละเอียดโพสต์..."
            />
          </div>
          <button
            className="bg-foreground mt-4 flex w-full items-center justify-center gap-4 rounded-lg p-3 duration-100 hover:bg-zinc-900 dark:hover:bg-zinc-100"
            type="submit"
            disabled={loading}
          >
            <p className="text-background">โพสต์</p>
          </button>
        </form>
        <button
          className="mt-6 w-full rounded-lg border p-3 duration-100 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          onClick={closeModal}
        >
          <p>ปิด</p>
        </button>
        {/*  */}
      </div>
    </div>
  );
}
