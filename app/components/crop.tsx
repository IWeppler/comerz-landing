import Image from "next/image";
import { cn } from "@/lib/cn";

/** A rectangle inside the source image, in the image's own pixels. */
export type Region = { x: number; y: number; w: number; h: number };

export type Shot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  region?: Region;
};

/**
 * Shows one region of a real screenshot at full width, instead of shrinking the
 * whole capture until nothing in it can be read. The box takes the region's
 * aspect ratio and the image is scaled and shifted so only that region shows.
 *
 * `vw` is how wide the box renders on phones and on desktop, in viewport
 * widths; it is multiplied by the zoom factor so the browser picks a source
 * sharp enough for the enlarged image.
 */
export function Crop({
  src,
  alt,
  width,
  height,
  region = { x: 0, y: 0, w: width, h: height },
  vw = [100, 50],
  preload,
  className,
}: Shot & { vw?: [number, number]; preload?: boolean; className?: string }) {
  const zoom = width / region.w;

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio: `${region.w} / ${region.h}` }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        preload={preload}
        sizes={`(max-width: 768px) ${Math.round(vw[0] * zoom)}vw, ${Math.round(vw[1] * zoom)}vw`}
        className="absolute block h-auto max-w-none"
        style={{
          width: `${zoom * 100}%`,
          left: `${(-region.x / region.w) * 100}%`,
          top: `${(-region.y / region.h) * 100}%`,
        }}
      />
    </div>
  );
}
