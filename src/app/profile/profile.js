"use client";

import { createClient } from "@/utils/supabase/client";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserData() {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        return router.push("/login");
      }

      setUser(authUser);

      // After confirming user is logged in, fetch profile data
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      setProfile(profileData);
      setLoading(false);
      console.log(profileData);
    }

    loadUserData();
  }, [router, supabase]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div className="p-6">
      <div>
        <div className="relative flex h-48 w-full justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
          <div className="absolute top-32 flex flex-col items-center gap-2 text-center">
            {/* Show placeholder or skeleton during loading */}
            {loading ? (
              <div className="border-background! aspect-square w-28 rounded-full border-8 bg-zinc-100 dark:bg-zinc-900" />
            ) : (
              <Image
                src={profile?.avatar_url || user?.user_metadata?.avatar_url}
                width={80}
                height={80}
                alt="Avatar"
                className="border-background! aspect-square w-28 rounded-full border-8 bg-zinc-100 dark:bg-zinc-900"
              />
            )}
            {loading ? (
              <div className="h-6 w-32 rounded-lg bg-zinc-100 dark:bg-zinc-900" />
            ) : (
              <p className="font-kranky text-xl font-semibold uppercase">
                {profile?.username}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="flex-1 text-center text-nowrap">
            {loading ? (
              <p className="mx-auto w-10 rounded-lg bg-zinc-100 text-transparent dark:bg-zinc-900">
                0
              </p>
            ) : (
              <p>0</p>
            )}
            <p className="text-sm opacity-50">ผู้ติดตาม</p>
          </div>
          <div className="w-28"></div>
          <div className="flex-1 text-center text-nowrap">
            {loading ? (
              <p className="mx-auto w-10 rounded-lg bg-zinc-100 text-transparent dark:bg-zinc-900">
                0
              </p>
            ) : (
              <p>0</p>
            )}
            <p className="text-sm opacity-50">ถูกใจ</p>
          </div>
        </div>
      </div>
      <div className="mt-12">
        {loading ? (
          <>
            <p className="mx-auto w-2/3 rounded-lg bg-zinc-100 text-transparent dark:bg-zinc-900">
              0
            </p>
          </>
        ) : (
          profile && <p className="text-center">{profile.bio}</p>
        )}
      </div>
      <div className="mt-4 flex gap-4">
        <button className="flex-1 rounded-lg bg-zinc-100 p-3 duration-100 hover:bg-zinc-200 focus-visible:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800 dark:active:bg-zinc-700">
          แก้ไขโปรไฟล์
        </button>
        <button className="flex-1 rounded-lg bg-zinc-100 p-3 duration-100 hover:bg-zinc-200 focus-visible:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800 dark:active:bg-zinc-700">
          แชร์โปรไฟล์
        </button>
        <button
          onClick={handleLogout}
          className="rounded-lg bg-zinc-100 p-3 duration-100 hover:bg-zinc-200 focus-visible:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800 dark:active:bg-zinc-700"
        >
          <LogOutIcon />
        </button>
      </div>
    </div>
  );
}
