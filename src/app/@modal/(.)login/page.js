"use client";

import { CheckSquare2Icon, LampCeilingIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import googleIcon from "./google.svg";

export default function Page() {
  const supabase = createClient();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setIsVisible(true);

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const signInWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/login/callback`,
    queryParams: {
      access_type: 'offline',
      prompt: 'consent',
    },
  
      },
    });
  };

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      router.back();
    }, 300);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-20 flex items-center justify-center bg-zinc-950/5 p-6 backdrop-blur-xs duration-300 dark:bg-zinc-50/5 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`bg-background relative w-full max-w-lg overflow-hidden rounded-lg p-10 duration-300 ${
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <div
            className={`${
              isVisible ? "dark:bg-amber-100/15" : "bg-transparent"
            } absolute inset-0 mx-auto h-1/3 blur-3xl delay-300 duration-1000`}
          ></div>
          <div>
            <LampCeilingIcon
              className={`${
                isVisible
                  ? "dark:fill-amber-200 dark:text-amber-200"
                  : "fill-foreground text-foreground"
              } mx-auto h-10 w-10 delay-300 duration-1000`}
            />
          </div>
          <h1 className="font-kranky mt-6 text-center text-6xl font-semibold">
            LOGIN
          </h1>
          <div className="mt-6">
            <p className="text-lg font-semibold">ล็อกอินแล้วได้อะไร?</p>
            <ul className="grid gap-2">
              <li className="flex gap-2">
                <CheckSquare2Icon className="h-10 w-10" />
                <p>
                  สามารถแบ่งปันความคิดสร้างสรรค์ของคุณ ด้วยการลงผลงานของคุณเอง
                </p>
              </li>
              <li className="flex gap-2">
                <CheckSquare2Icon className="h-10 w-10" />
                <p>
                  สามารถกดถูกใจและกดติดตามเพื่อเป็นกำลังใจให้กับศิลปินและผลงานที่คุณหลงรัก
                </p>
              </li>
            </ul>
          </div>
          <button
            className="bg-foreground mt-6 flex w-full items-center justify-center gap-4 rounded-lg p-3 duration-100 hover:bg-zinc-900 focus-visible:bg-zinc-900 active:bg-zinc-800 dark:hover:bg-zinc-100 dark:focus-visible:bg-zinc-100 dark:active:bg-zinc-200"
            onClick={signInWithGoogle}
          >
            <Image
              className="h-6 w-6"
              src={googleIcon}
              alt="Google logo"
              as="image"
              priority
            />
            <p className="text-background">ล็อกอินด้วย Google</p>
          </button>
          <button
            className="mt-4 w-full rounded-lg border p-3 duration-100 hover:bg-zinc-100 focus-visible:bg-zinc-100 active:bg-zinc-200 dark:hover:bg-zinc-900 dark:focus-visible:bg-zinc-900 dark:active:bg-zinc-800"
            onClick={closeModal}
          >
            <p>ปิด</p>
          </button>
          <div className="mt-10 flex justify-center gap-2 text-sm">
            <p className="underline">Terms of Use</p>
            <p>|</p>
            <p className="underline">Privacy Policy</p>
          </div>
        </div>
      </div>
    </>
  );
}
