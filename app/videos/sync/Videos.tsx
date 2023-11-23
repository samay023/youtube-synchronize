import Card from "@/components/Card";
import type { youtube_v3 } from "googleapis/build/src/apis/youtube/v3";
import Link from "next/link";
import Image from "next/image";

interface Props {
  videos: youtube_v3.Schema$SearchResult[];
}

export default function Videos({ videos }: Props) {
  if (!videos.length)
    return <div className="mt-4 text-3xl">No videos found and synced</div>;

  return (
    <div className="mt-4">
      <div className="flex flex-row flex-wrap max-w-6xl gap-x-3">
        {videos.map((video) => (
          <Link
            className="w-[300px] rounded overflow-hidden shadow-lg cursor-pointer hover:bg-gray-100 max-h-96"
            href={`/videos/${video.id?.videoId}`}
          >
            <Image
              className="w-full"
              width={480}
              height={360}
              src={video.snippet?.thumbnails?.high?.url ?? ""}
              alt=""
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                {video.snippet?.title ?? ""}
              </div>
              <p
                className="text-gray-700 text-ellipsis overflow-hidden"
                title={video.snippet?.description ?? ""}
              >
                {video.snippet?.description ?? ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
