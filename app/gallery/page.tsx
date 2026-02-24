import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and moments outside the lab.",
};

interface Photo {
  src: string;
  caption?: string;
  date?: string;
}

function getPhotos(): Photo[] {
  const manifestPath = path.join(process.cwd(), "public", "gallery", "photos.json");
  if (fs.existsSync(manifestPath)) {
    const raw = fs.readFileSync(manifestPath, "utf-8");
    return JSON.parse(raw) as Photo[];
  }

  // Auto-discover images if no manifest
  const galleryDir = path.join(process.cwd(), "public", "gallery");
  if (!fs.existsSync(galleryDir)) return [];
  const imageExts = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
  return fs
    .readdirSync(galleryDir)
    .filter((f) => imageExts.includes(path.extname(f).toLowerCase()))
    .map((f) => ({ src: `/gallery/${f}` }));
}

export default function GalleryPage() {
  const photos = getPhotos();

  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-4">
        Gallery
      </p>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Gallery</h1>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-10">
        Life outside the lab.
      </p>
      {photos.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">
          No photos yet.
        </p>
      ) : (
        <GalleryGrid photos={photos} />
      )}
    </div>
  );
}
