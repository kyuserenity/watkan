"use client";

import { CheckSquare2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { createClient } from "@/utils/supabase/client";
import googleIcon from "./google.svg";

function LoginContent() {
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

export default function Page() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}

const LoginModal = ({ isVisible, onClose, onGoogleLogin }) => (
  <div
    className={`bg-background fixed inset-0 z-20 flex items-center justify-center p-8 duration-300 ${
      isVisible ? "opacity-100" : "opacity-0"
    }`}
  >
    <div
      className={`max-h-full w-full max-w-3xl duration-300 ${
        isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}
    >
      <h1 className="text-6xl font-semibold">ล็อกอินแล้วได้อะไร?</h1>
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
  <li className="flex gap-4">
    <div>
      <CheckSquare2Icon />
    </div>
    <p>{text}</p>
  </li>
);

const LoginButtons = ({ onGoogleLogin, onClose }) => (
  <>
    <button
      className="bg-foreground mt-6 flex w-full items-center justify-center gap-4 rounded-lg p-3 duration-100 hover:bg-zinc-900 dark:hover:bg-zinc-100"
      onClick={onGoogleLogin}
      type="button"
    >
      <Image className="h-6 w-6" src={googleIcon} alt="Google logo" priority />
      <p className="text-background">ล็อกอินด้วย Google</p>
    </button>
    <button
      className="mt-4 w-full rounded-lg border p-3 duration-100 hover:bg-zinc-100 dark:hover:bg-zinc-900"
      onClick={onClose}
      type="button"
    >
      <p>ปิด</p>
    </button>
  </>
);
