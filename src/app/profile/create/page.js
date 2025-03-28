"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import heic2any from "heic2any";

export default function ArtworkUploadPage() {
  const router = useRouter();
  const supabase = createClient();

  const [state, setState] = useState({
    loading: false,
    loadingImage: false,
    isModalVisible: false,
    imagePreview: null,
    imageFile: null,
    description: "",
    errorMessage: "", // Added errorMessage state
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const visibilityTimer = setTimeout(
      () => setState((prev) => ({ ...prev, isModalVisible: true })),
      10,
    );

    return () => {
      document.body.style.overflow = "";
      clearTimeout(visibilityTimer);
    };
  }, []);

  const closeModal = () => {
    setState((prev) => ({ ...prev, isModalVisible: false }));
    setTimeout(() => router.back(), 300);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setState((prev) => ({
        ...prev,
        imagePreview: null,
        imageFile: null,
        loadingImage: true,
      }));

      let convertedFile = file;
      if (file.type === "image/heic" || file.name.endsWith(".heic")) {
        try {
          const conversionResult = await heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 1,
          });
          convertedFile = new File(
            [conversionResult],
            file.name.replace(/\.heic$/, ".jpg"),
            { type: "image/jpeg" },
          );
        } catch (error) {
          console.error("การแปลงไฟล์ HEIC ล้มเหลว:", error);
          setState((prev) => ({ ...prev, loadingImage: false }));
          return;
        }
      }

      const imagePreviewUrl = URL.createObjectURL(convertedFile);
      setState((prev) => ({
        ...prev,
        imageFile: convertedFile,
        imagePreview: imagePreviewUrl,
        loadingImage: false,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state.imageFile) {
      setState((prev) => ({
        ...prev,
        errorMessage: "กรุณาอัพโหลดรูปด้วยครับ",
      }));
      return;
    }
    setState((prev) => ({ ...prev, loading: true, errorMessage: "" }));

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setState((prev) => ({ ...prev, loading: false }));
        return;
      }

      const timestamp = new Date().toISOString().replace(/:/g, "-");
      const fileExtension = state.imageFile.name.split(".").pop();
      const filePath = `artworks/${user.id}/${timestamp}.${fileExtension}`;

      const { error: uploadError } = await supabase.storage
        .from("data")
        .upload(filePath, state.imageFile, {
          contentType: state.imageFile.type,
        });

      if (uploadError) throw uploadError;
      const { data: imageUrlData } = await supabase.storage
        .from("data")
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase.from("artworks").insert({
        profile_id: user.id,
        description: state.description,
        image_url: imageUrlData.publicUrl,
      });

      if (insertError) throw insertError;
      router.push("/profile");
    } catch (error) {
      console.error("Upload Error:", error);
      setState((prev) => ({
        ...prev,
        loading: false,
        errorMessage: "เกิดข้อผิดพลาดในการอัปโหลดหรือบันทึกข้อมูล", // Set error message
      }));
    }
  };

  return (
    <div
      className={`bg-background fixed inset-0 z-20 flex items-center justify-center p-8 duration-300 ${state.isModalVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`max-h-full w-full max-w-md overflow-auto duration-300 ${state.isModalVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        <h1 className="text-3xl font-semibold">สร้างโพสต์</h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <label className="block cursor-pointer">
            {state.loadingImage ? (
              <div className="flex aspect-square items-center justify-center rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800">
                <p className="opacity-65">กำลังโหลดรูป...</p>
              </div>
            ) : state.imagePreview ? (
              <img
                src={state.imagePreview}
                alt="Preview"
                className="w-full rounded-lg"
              />
            ) : (
              <div className="flex aspect-square items-center justify-center rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800">
                <p className="opacity-65">คลิกเพื่อเลือกรูปภาพ</p>
              </div>
            )}
            <input
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={state.loading || state.loadingImage} // Disable input while loading image
            />
          </label>
          <textarea
            className="mt-4 w-full resize-none rounded-lg bg-zinc-100 px-4 py-2 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            rows={3}
            placeholder="รายละเอียดโพสต์..."
            value={state.description}
            onChange={(e) =>
              setState((prev) => ({ ...prev, description: e.target.value }))
            }
            disabled={state.loading}
          />
          {state.errorMessage && ( // Display error message if exists
            <p className="mb-4 text-red-500">{state.errorMessage}</p>
          )}
          <button
            className="bg-foreground text-background mt-6 flex w-full items-center justify-center gap-4 rounded-lg p-3 hover:bg-zinc-900 dark:hover:bg-zinc-100"
            type="submit"
            disabled={state.loading}
          >
            {state.loading ? "กำลังโพสต์..." : "โพสต์"}
          </button>
        </form>
        <button
          className="mt-4 w-full rounded-lg border p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          onClick={closeModal}
          disabled={state.loading}
        >
          ปิด
        </button>
      </div>
    </div>
  );
}
