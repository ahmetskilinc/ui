"use client";

import { VideoPlayer } from "@/registry/default/components/video-player";

export default function VideoPlayerPreview() {
  return (
    <div className="w-full">
      <VideoPlayer
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
        className="aspect-video"
      />
    </div>
  );
}
