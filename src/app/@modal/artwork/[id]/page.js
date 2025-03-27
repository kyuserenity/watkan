"use client";

import { ArrowLeftIcon, EllipsisIcon } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [artwork, setArtwork] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const menuRef = useRef(null);
  const ellipsisButtonRef = useRef(null);
  const supabase = createClient();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setIsVisible(true);

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const { data, error } = await supabase
          .from("artworks")
          .select("*")
          .eq("id", id)
          .single();

        if (error || !data) {
          console.error("Error fetching artwork:", error);
          closeModal(); // Close modal if id is not found
        } else {
          setArtwork(data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    if (id) fetchArtwork();
  }, [id, supabase]);

  useEffect(() => {
    const checkOwnership = async () => {
      try {
        const { data: user } = await supabase.auth.getUser();
        if (user && artwork && user.id === artwork.owner_id) {
          setIsOwner(true);
        }
      } catch (err) {
        console.error("Error checking ownership:", err);
      }
    };

    if (artwork) checkOwnership();
  }, [artwork, supabase]);

  // Handle clicking outside of menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        ellipsisButtonRef.current &&
        !ellipsisButtonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => router.back(), 300);
  };

  const togglePreview = () => setIsPreviewOpen((prev) => !prev);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const deleteArtwork = async () => {
    if (!artwork) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("artworks")
        .delete()
        .eq("id", artwork.id);

      if (error) {
        console.error("Error deleting artwork:", error);
      } else {
        closeModal();
      }
    } catch (err) {
      console.error("Unexpected error during deletion:", err);
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`bg-background fixed inset-0 z-20 flex items-start justify-center transition-opacity duration-500 ${
        isVisible
          ? "opacity-100 backdrop-blur-xs"
          : "opacity-0 backdrop-blur-none"
      }`}
    >
      {/* Show loading state */}
      {isDeleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-100/75 backdrop-blur-xs dark:bg-zinc-900/75">
          <p className="text-3xl font-semibold">กำลังลบ...</p>
        </div>
      )}
      <div
        className={`flex h-full max-h-full w-full max-w-2xl transform flex-col transition-all duration-500 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        } ${isMenuOpen ? "relative" : ""}`}
      >
        <div className="relative flex justify-between border-b p-4">
          <button
            className="hover:opacity-75 focus-visible:opacity-75 active:opacity-50"
            onClick={closeModal}
          >
            <ArrowLeftIcon className="h-8 w-8" />
          </button>
          <button
            ref={ellipsisButtonRef}
            className="hover:opacity-75 focus-visible:opacity-75 active:opacity-50"
            onClick={toggleMenu}
          >
            <EllipsisIcon className="h-8 w-8" />
          </button>
        </div>
        <div className="h-full w-full p-8">
          {artwork ? (
            <div>
              <div className="aspect-square rounded-lg bg-zinc-100 dark:bg-zinc-900">
                <Image
                  className={`${
                    isPreviewOpen
                      ? "bg-background fixed top-0 left-0 z-30 h-screen w-screen object-contain opacity-100"
                      : "aspect-square w-full rounded-lg object-cover opacity-90"
                  } cursor-pointer duration-200`}
                  src={artwork.image_url}
                  width={0}
                  height={0}
                  sizes="150vw"
                  alt={artwork.description}
                  onClick={togglePreview}
                />
                <p
                  className={`${
                    !isPreviewOpen && "hidden"
                  } bg-opacity-75 fixed bottom-12 left-1/2 z-30 -translate-x-1/2 rounded bg-zinc-100/50 px-4 py-2 dark:bg-zinc-900/50`}
                >
                  คลิกอีกครั้งเพื่อย้อนกลับ
                </p>
              </div>
              <div className="mt-4">
                <p className="text-lg">{artwork.description}</p>
                <p className="text-sm opacity-50">{artwork.created_at}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="aspect-square w-11 rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
                  <div>
                    <p className="uppercase">username</p>
                    <p className="text-sm opacity-50">2 วันที่ผ่านมา</p>
                  </div>
                </div>
                <button className="rounded-lg bg-zinc-100 px-4 py-2 dark:bg-zinc-900">
                  <p>ติดตาม</p>
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </div>
      </div>
      {/* Bottom Slide-Up Menu */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-30 cursor-pointer bg-zinc-100/75 backdrop-blur-xs dark:bg-zinc-900/75"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Slide-Up Menu */}
          <div
            className="fixed right-0 bottom-0 left-0 z-40 mx-auto max-w-2xl rounded-t-lg bg-zinc-100 shadow-2xl dark:bg-zinc-900"
            ref={menuRef}
          >
            {/* Menu Items */}
            <div className="p-4">
              <button className="flex w-full items-center gap-4 rounded-lg p-4 text-left hover:bg-zinc-200 dark:hover:bg-zinc-800">
                <span>แชร์</span>
              </button>
              {isOwner ? (
                <button
                  className="flex w-full items-center gap-4 rounded-lg p-4 text-left text-red-500 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                  onClick={deleteArtwork}
                >
                  <span>ลบ</span>
                </button>
              ) : (
                <button className="flex w-full items-center gap-4 rounded-lg p-4 text-left text-red-500 hover:bg-zinc-200 dark:hover:bg-zinc-800">
                  <span>รายงาน</span>
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
