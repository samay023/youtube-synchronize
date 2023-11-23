import Card from "@/components/Card";
import prisma from "@/prisma/client";
import Image from "next/image";

const getAllVideos = async () => {
  return prisma.youtubeVideo.findMany({});
};

export default async function Videos() {
  const allVideos = await getAllVideos();
  return (
    <div>
      <h1 className="text-3xl">List of all videos</h1>

      <div className="mt-4 flex flex-row flex-wrap gap-x-10">
        {allVideos.map((video) => (
          <Card
            description={video.description}
            imageUrl={video.thumbnailUrl}
            title={video.title}
            id={video.id}
            key={video.id}
          />
        ))}
      </div>
    </div>
  );
}
