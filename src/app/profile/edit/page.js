"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const supabase = createClient();

  const [profile, setProfile] = useState({
    username: "",
    bio: "",
    color: "#000000",
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setTimeout(() => setIsVisible(true), 10);

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    async function loadUserData() {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) return router.push("/login");

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (profileData) {
        setProfile({
          username: profileData.username || "",
          bio: profileData.bio || "",
          color: profileData.color || "#000000", // ดึงค่า color ถ้ามี
        });
      }

      setLoading(false);
    }

    loadUserData();
  }, [router, supabase]);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => router.back(), 300);
  };

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSaving) return;

    setIsSaving(true);
    setError("");

    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();
    if (!authUser) return router.push("/login");

    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("username, id")
      .eq("username", profile.username.trim())
      .single();

    if (existingProfile && existingProfile.id !== authUser.id) {
      setError("ชื่อผู้ใช้นี้มีอยู่แล้วในระบบ");
      setIsSaving(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        username: profile.username.trim(),
        bio: profile.bio.trim(),
        color: profile.color.trim(),
      })
      .eq("id", authUser.id);

    if (error) {
      setError("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      setIsSaving(false);
      return;
    }

    router.push("/profile");
  };

  return (
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
        <h1 className="text-3xl font-semibold">แก้ไขโปรไฟล์</h1>
        <form onSubmit={handleSubmit}>
          <div className="mt-4 grid gap-2">
            <div>
              <p>ชื่อผู้ใช้</p>
              <input
                className="w-full rounded-lg bg-zinc-100 px-4 py-3 dark:bg-zinc-900"
                type="text"
                name="username"
                placeholder={
                  loading ? "กำลังโหลด..." : "ใส่ชื่อผู้ใช้ของคุณ..."
                }
                value={loading ? "" : profile.username}
                autoComplete="off"
                onChange={handleChange}
                disabled={loading || isSaving}
              />
            </div>
            <div>
              <p>แนะนำตัว</p>
              <textarea
                className="w-full resize-none rounded-lg bg-zinc-100 px-4 py-3 dark:bg-zinc-900"
                name="bio"
                placeholder={
                  loading ? "กำลังโหลด..." : "ใส่ข้อความแนะนำตัวของคุณ..."
                }
                value={loading ? "" : profile.bio}
                rows={3}
                autoComplete="off"
                onChange={handleChange}
                disabled={loading || isSaving}
              />
            </div>
            <div>
              <p>สีพื้นหลังโปรไฟล์</p>
              <input
                className="h-12 w-full rounded-lg bg-zinc-100 px-4 py-3 dark:bg-zinc-900"
                type="color"
                name="color"
                value={profile.color}
                onChange={handleChange}
                disabled={loading || isSaving}
              />
            </div>
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          <button
            className="bg-foreground mt-6 flex w-full items-center justify-center gap-4 rounded-lg p-3 duration-100 hover:bg-zinc-900 dark:hover:bg-zinc-100"
            type="submit"
            disabled={loading || isSaving}
          >
            <p className="text-background">
              {isSaving ? "กำลังบันทึก..." : "บันทึก"}
            </p>
          </button>
        </form>
        <button
          className="mt-4 w-full rounded-lg border p-3 duration-100 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          onClick={closeModal}
          disabled={isSaving}
        >
          <p>ปิด</p>
        </button>
      </div>
    </div>
  );
}
