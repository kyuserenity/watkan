"use client";

import { CheckSquare2Icon, LampCeilingIcon } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import googleIcon from "./google.svg";

const LoginModal = ({ isVisible, onClose, onGoogleLogin }) => (
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
      <LampCeilingIcon className="mx-auto h-10 w-10 delay-300 duration-1000 dark:fill-amber-200 dark:text-amber-200" />
      <h1 className="font-kranky mt-6 text-center text-6xl font-semibold">
        LOGIN
      </h1>
      <LoginBenefits />
      <LoginButtons onGoogleLogin={onGoogleLogin} onClose={onClose} />
    </div>
  </div>
);

const LoginBenefits = () => (
  <ul className="mt-6 grid gap-2">
    <BenefitItem text="แบ่งปันความคิดสร้างสรรค์ของคุณ ด้วยการลงผลงานของคุณเอง" />
    <BenefitItem text="กดถูกใจและติดตามศิลปินที่คุณหลงรัก" />
  </ul>
);

const BenefitItem = ({ text }) => (
  <li className="flex gap-2">
    <CheckSquare2Icon />
    <p>{text}</p>
  </li>
);

const LoginButtons = ({ onGoogleLogin, onClose }) => (
  <>
    <button
      className="bg-foreground mt-6 flex w-full items-center justify-center gap-4 rounded-lg p-3 duration-100 hover:bg-zinc-900 dark:hover:bg-zinc-100"
      onClick={onGoogleLogin}
    >
      <Image className="h-6 w-6" src={googleIcon} alt="Google logo" priority />
      <p className="text-background">ล็อกอินด้วย Google</p>
    </button>
    <button
      className="mt-4 w-full rounded-lg border p-3 duration-100 hover:bg-zinc-100 dark:hover:bg-zinc-900"
      onClick={onClose}
    >
      <p>ปิด</p>
    </button>
  </>
);

export default function Page() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setIsVisible(true);
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback${next ? `?next=${next}` : ""}`,
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
    <LoginModal
      isVisible={isVisible}
      onClose={closeModal}
      onGoogleLogin={handleGoogleLogin}
    />
  );
}
