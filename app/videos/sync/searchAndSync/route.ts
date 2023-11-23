import { getVideo, searchVideos } from "@/lib/youtubeApi";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;

  const id = searchParams.get("id");
  if (id) {
    const video = await getVideo(id);

    if (!video?.id || !video?.snippet)
      return NextResponse.json({ message: "Video not found" }, { status: 404 });

    await prisma.youtubeVideo.upsert({
      where: {
        id: video.id,
      },
      create: {
        id: video.id,
        description: video.snippet.description ?? "",
        title: video.snippet.title ?? "",
        publishedAt: video.snippet.publishedAt ?? "",
        thumbnailUrl: video.snippet.thumbnails?.default?.url ?? "",
        channel: {
          connectOrCreate: {
            where: {
              id: video.snippet.channelId ?? "",
            },
            create: {
              id: video.snippet.channelId ?? "",
              author: video.snippet.channelTitle ?? "",
            },
          },
        },
      },
      update: {
        description: video.snippet.description ?? "",
        title: video.snippet.title ?? "",
        publishedAt: video.snippet.publishedAt ?? "",
        thumbnailUrl: video.snippet.thumbnails?.default?.url ?? "",
      },
    });
  }

  return NextResponse.json({ message: "Success" }, { status: 200 });
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const searchKey = formData.get("searchKey") ?? "";
  const channelId = formData.get("channelId") ?? "";

  const searchResult = await searchVideos(
    searchKey.toString(),
    channelId.toString()
  );

  await prisma.$transaction(
    searchResult
      .map((video) => {
        if (!video?.id?.videoId) return;

        return prisma.youtubeVideo.upsert({
          where: {
            id: video.id.videoId,
          },
          create: {
            id: video.id.videoId,
            description: video.snippet?.description ?? "",
            title: video.snippet?.title ?? "",
            publishedAt: video.snippet?.publishedAt ?? "",
            thumbnailUrl: video.snippet?.thumbnails?.high?.url ?? "",
            channel: {
              connectOrCreate: {
                where: {
                  id: video.snippet?.channelId ?? "",
                },
                create: {
                  id: video.snippet?.channelId ?? "",
                  author: video.snippet?.channelTitle ?? "",
                },
              },
            },
          },
          update: {
            description: video.snippet?.description ?? "",
            publishedAt: video.snippet?.publishedAt ?? "",
            thumbnailUrl: video.snippet?.thumbnails?.default?.url ?? "",
            title: video.snippet?.title ?? "",
          },
        });
      })
      .filter(Boolean) as any // Lazy type fix
  );
  return NextResponse.json({ videos: searchResult }, { status: 200 });
}
