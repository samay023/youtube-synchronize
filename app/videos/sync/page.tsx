"use client";

import { useState } from "react";
import SyncForm from "./Form";
import Videos from "./Videos";
import type { youtube_v3 } from "googleapis/build/src/apis/youtube/v3";

export default function SyncVideo() {
  const [videos, setVideos] = useState<youtube_v3.Schema$SearchResult[]>([]);

  return (
    <div>
      <h1 className="text-3xl">
        Lets sync a video using the below YT parameters
      </h1>

      <SyncForm setVideos={setVideos} />

      <Videos videos={videos} />
    </div>
  );
}
