"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Photo {
  src: string;
  caption?: string;
  date?: string;
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
      <div className="columns-2 sm:columns-3 gap-3 space-y-3">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setLightboxIndex(i)}
            className="w-full break-inside-avoid rounded-lg overflow-hidden block focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="relative w-full">
              <Image
                src={photo.src}
                alt={photo.caption ?? `Gallery photo ${i + 1}`}
                width={400}
                height={300}
                className="w-full h-auto object-cover hover:opacity-90 transition-opacity"
              />
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
            className="relative max-w-4xl max-h-[80vh] w-full mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].caption ?? `Photo ${lightboxIndex + 1}`}
              width={1200}
              height={900}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            {photos[lightboxIndex].caption && (
              <p className="mt-3 text-center text-sm text-neutral-300">
                {photos[lightboxIndex].caption}
              </p>
            )}
            <p className="mt-1 text-center text-xs text-neutral-500">
              {lightboxIndex + 1} / {photos.length}
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
