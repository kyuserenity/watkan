"use client";

import { createClient } from "@/utils/supabase/client";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      setProfile(profileData);
      setLoading(false);
    }

    loadUserData();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const renderProfileData = () => (
    <>
      <div
        className={`${
          loading
            ? "bg-zinc-100 dark:bg-zinc-900"
            : !profile?.color && "bg-zinc-100 dark:bg-zinc-900"
        } relative flex h-48 w-full justify-center rounded-lg duration-500`}
        style={{
          backgroundColor: loading ? "" : profile?.color || "black",
        }}
      >
        <div className="absolute top-36 flex flex-col items-center gap-2 text-center">
          {loading ? (
            <div className="bg-background aspect-square w-28 overflow-hidden rounded-full p-2">
              <div className="h-full w-full rounded-full bg-zinc-100 dark:bg-zinc-900" />
            </div>
          ) : (
            <div className="bg-background aspect-square w-28 overflow-hidden rounded-full p-2">
              <Image
                src={profile?.avatar_url || user?.user_metadata?.avatar_url}
                width={80}
                height={80}
                alt="Avatar"
                className="h-full w-full rounded-full"
                priority
              />
            </div>
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
      <div className="mt-4 flex gap-28">
        {["ผู้ติดตาม", "ถูกใจ"].map((label) => (
          <div key={label} className="flex-1 text-center text-nowrap">
            {loading ? (
              <p className="mx-auto w-10 rounded-lg bg-zinc-100 text-transparent dark:bg-zinc-900">
                0
              </p>
            ) : (
              <p>0</p>
            )}
            <p className="mt-1 text-sm opacity-50">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        {loading ? (
          <p className="mx-auto w-2/3 rounded-lg bg-zinc-100 text-transparent dark:bg-zinc-900">
            0
          </p>
        ) : (
          profile && <p className="text-center">{profile.bio}</p>
        )}
      </div>
    </>
  );

  return (
    <div>
      {renderProfileData()}

      <div className="mt-4 flex gap-4">
        <Link
          className="flex-1 rounded-lg bg-zinc-100 p-3 text-center duration-100 hover:bg-zinc-200 focus-visible:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800 dark:active:bg-zinc-700"
          href="/profile/edit"
        >
          แก้ไขโปรไฟล์
        </Link>
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