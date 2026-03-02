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
  title?: string;
  location?: string;
  date?: string;
  caption?: string;
}

function getPhotos(): Photo[] {
  const manifestPath = path.join(process.cwd(), "public", "gallery", "photos.json");
  if (fs.existsSync(manifestPath)) {
    const raw = fs.readFileSync(manifestPath, "utf-8");
    const manifest = JSON.parse(raw) as Photo[];
    if (manifest.length > 0) return manifest;
  }

  // Auto-discover images if no manifest
  const imageExts = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
  const photos: Photo[] = [];

  // Check root gallery dir
  const galleryDir = path.join(process.cwd(), "public", "gallery");
  if (fs.existsSync(galleryDir)) {
    photos.push(
      ...fs.readdirSync(galleryDir)
        .filter((f) => imageExts.includes(path.extname(f).toLowerCase()))
        .map((f) => ({ src: `/gallery/${f}` }))
    );
  }

  // Check gallery/images subfolder
  const imagesDir = path.join(galleryDir, "images");
  if (fs.existsSync(imagesDir)) {
    photos.push(
      ...fs.readdirSync(imagesDir)
        .filter((f) => imageExts.includes(path.extname(f).toLowerCase()))
        .map((f) => ({ src: `/gallery/images/${f}` }))
    );
  }

  return photos;
}

export default function GalleryPage() {
  const photos = getPhotos();

  return (
    <div className="py-20 px-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-14">
        <h1 className="font-display font-extrabold uppercase text-neutral-900 tracking-tight text-5xl leading-none">
          Gallery
        </h1>
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-300 pb-1">
          {String(photos.length).padStart(2, "0")} photos
        </span>
      </div>

      <p className="font-display text-neutral-400 text-sm max-w-md leading-relaxed mb-10">
        Life outside the lab.
      </p>

      {photos.length === 0 ? (
        <p className="font-display text-neutral-400 text-sm">
          No photos yet — check back soon.
        </p>
      ) : (
        <GalleryGrid photos={photos} />
      )}
    </div>
  );
}
