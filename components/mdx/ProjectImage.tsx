import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export default function ProjectImage({
  src,
  alt,
  caption,
  width = 800,
  height = 500,
}: Props) {
  return (
    <figure className="my-8">
      <div className="relative rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
          style={{ objectFit: "contain" }}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-neutral-500 dark:text-neutral-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
