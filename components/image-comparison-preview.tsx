"use client";

import { ImageComparison } from "@/registry/default/components/image-comparison";

export default function ImageComparisonPreview() {
  return (
    <div className="w-full max-w-2xl">
      <ImageComparison
        className="aspect-video"
        showLabels
        before={
          <img
            alt="Before"
            src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&q=80&auto=format&fit=crop"
            className="h-full w-full object-cover"
          />
        }
        after={
          <img
            alt="After"
            src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&q=80&auto=format&fit=crop&sat=-100"
            className="h-full w-full object-cover saturate-0"
          />
        }
        beforeLabel="Color"
        afterLabel="B&W"
      />
    </div>
  );
}
