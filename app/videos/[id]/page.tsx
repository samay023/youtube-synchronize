import { YoutubeVideoFrame } from "@/components/YoutubeVideoFrame";
import prisma from "@/prisma/client";
import { useSearchParams } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const getYTVideo = async (id: string) =>
  prisma.youtubeVideo.findUnique({ where: { id } });

export default async function Video({ params: { id } }: Props) {
  const video = await getYTVideo(id);

  if (!video) return <p>Video not found</p>;
  return (
    <div>
      <YoutubeVideoFrame title={video.title} videoId={video.id} />
    </div>
  );
}
