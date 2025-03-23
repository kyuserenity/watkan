import { createClient } from "@/utils/supabase/server";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, avatar_url")
    .eq("id", user.id)
    .single();

  async function handleLogout() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect("/");
  }

  return (
    <div className="p-6">
      <div>
        <div className="relative flex h-48 w-full justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
          <div className="absolute top-32 flex flex-col items-center gap-2 text-center">
            <Image
              src={profile?.avatar_url || user.user_metadata.avatar_url}
              width={80}
              height={80}
              alt="Avatar"
              className="border-background! aspect-square w-28 rounded-full border-8 bg-zinc-100 dark:bg-zinc-900"
            />
            <p className="font-kranky text-xl font-semibold uppercase">
              {profile?.username || user.user_metadata.name}
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="flex-1 text-center text-nowrap">
            <p>0</p>
            <p className="text-sm opacity-50">ผู้ติดตาม</p>
          </div>
          <div className="w-28"></div>
          <div className="flex-1 text-center text-nowrap">
            <p>0</p>
            <p className="text-sm opacity-50">ถูกใจ</p>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <p>
          ย่อหน้าต่าง อิกัวนาพาเหรด พุทโธเซอร์วิสแบล็กเทคโนแครต
          มินท์ลีเมอร์ฮิปฮอป รีวิวพงษ์ สตรอเบอร์รีเป่ายิงฉุบภูมิทัศน์
        </p>
      </div>
      <div className="mt-4 flex gap-4">
        <button className="flex-1 rounded-lg bg-zinc-100 p-3 duration-100 hover:bg-zinc-200 focus-visible:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800 dark:active:bg-zinc-700">
          แก้ไขโปรไฟล์
        </button>
        <button className="flex-1 rounded-lg bg-zinc-100 p-3 duration-100 hover:bg-zinc-200 focus-visible:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800 dark:active:bg-zinc-700">
          แชร์โปรไฟล์
        </button>
        <form action={handleLogout}>
          <button
            type="submit"
            className="rounded-lg bg-zinc-100 p-3 duration-100 hover:bg-zinc-200 focus-visible:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800 dark:active:bg-zinc-700"
          >
            <LogOutIcon />
          </button>
        </form>
      </div>
    </div>
  );
}
