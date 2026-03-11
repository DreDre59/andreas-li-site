"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Photo {
  src: string;
  title?: string;
  location?: string;
  date?: string;
  caption?: string;
}

interface Props {
  photos: Photo[];
}

export default function GalleryGrid({ photos }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  function prev() {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
  }

  function next() {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % photos.length);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") setLightboxIndex(null);
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setLightboxIndex(i)}
            className="group w-full overflow-hidden block focus:outline-none focus:ring-2 focus:ring-neutral-900 relative aspect-[4/3]"
          >
            <Image
              src={photo.src}
              alt={photo.title ?? photo.caption ?? `Gallery photo ${i + 1}`}
              fill
              className="object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <div className="text-left">
                {photo.title && (
                  <p className="font-mono text-xs font-medium text-white uppercase tracking-widest leading-tight">
                    {photo.title}
                  </p>
                )}
                {(photo.location || photo.date) && (
                  <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest mt-1">
                    {[photo.location, photo.date].filter(Boolean).join(" — ")}
                  </p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal
          aria-label="Photo lightbox"
        >
          <button
            className="absolute top-4 right-4 p-2 text-white hover:text-neutral-300 transition-colors"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
          >
            <X size={24} />
          </button>

          <button
            className="absolute left-4 p-2 text-white hover:text-neutral-300 transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
          >
            <ChevronLeft size={32} />
          </button>

          <div
            className="relative max-w-4xl max-h-[80vh] w-full mx-16 -translate-y-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].title ?? photos[lightboxIndex].caption ?? `Photo ${lightboxIndex + 1}`}
              width={1200}
              height={900}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            {(photos[lightboxIndex].title || photos[lightboxIndex].caption) && (
              <p className="mt-3 text-center font-display text-sm text-neutral-300">
                {photos[lightboxIndex].title ?? photos[lightboxIndex].caption}
              </p>
            )}
            {(photos[lightboxIndex].location || photos[lightboxIndex].date) && (
              <p className="mt-1 text-center font-mono text-xs text-neutral-500 uppercase tracking-widest">
                {[photos[lightboxIndex].location, photos[lightboxIndex].date].filter(Boolean).join(" — ")}
              </p>
            )}
            <p className="mt-1 text-center font-mono text-xs text-neutral-500 tracking-widest">
              {String(lightboxIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
            </p>
          </div>

          <button
            className="absolute right-4 p-2 text-white hover:text-neutral-300 transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </>
  );
}
