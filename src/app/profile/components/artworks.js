"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

export default function Artwork() {
  const supabase = createClient();
  const [artworks, setArtworks] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const loaderRef = useRef(null);
  const fetchCalled = useRef(false);

  const fetchArtworks = useCallback(async () => {
    if (loading || !hasMore || fetchCalled.current) return;
    fetchCalled.current = true;

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log("Fetching artworks for page:", page);

      const { data, error } = await supabase
        .from("artworks")
        .select("image_url, id")
        .eq("profile_id", user.id)
        .range(page * 4, page * 4 + 3);

      if (error) {
        console.error("Error fetching artworks:", error);
        setHasMore(false);
      } else {
        if (data.length < 4) {
          setHasMore(false);
        }
        setArtworks((prev) => [...prev, ...data]);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
      setInitialLoadComplete(true);
      fetchCalled.current = false;
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    if (!initialLoadComplete) {
      setArtworks([]);
      setPage(0);
      setHasMore(true);
      fetchArtworks();
    }
  }, [initialLoadComplete]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, hasMore]);

  if (initialLoadComplete && artworks.length === 0) {
    return (
      <div className="mt-4 border-t pt-4">
        <p className="text-center opacity-75">ไม่พบผลงาน</p>
      </div>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4">
      {artworks.map((artwork, index) => (
        <div
          key={`${artwork.id}-${index}`}
          className="relative aspect-square rounded-lg bg-zinc-100 dark:bg-zinc-900"
        >
          <Image
            src={artwork.image_url}
            alt="Artwork"
            fill
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      ))}

      {hasMore && (
        <div ref={loaderRef} className="col-span-2">
          <p className="text-center opacity-75">กำลังโหลด...</p>
        </div>
      )}
    </div>
  );
}
