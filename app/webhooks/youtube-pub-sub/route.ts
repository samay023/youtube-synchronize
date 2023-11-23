import prisma from "@/prisma/client";
import { YoutubeVideo } from "@prisma/client";
import { NextResponse } from "next/server";
import xml2js from "xml2js";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const challenge = searchParams.get("hub.challenge");

  if (challenge) {
    return new Response(challenge, { status: 200 });
  }
  return NextResponse.json({ message: "Success" }, { status: 200 });
}

export async function POST(request: Request) {
  try {
    console.log("Webhook called from Google PUBSUBHUBBUB");

    const bodyAsText = await request.text();
    const result = await xml2js.parseStringPromise(bodyAsText);
    const videos: YoutubeVideo[] = result.feed?.entry?.map((entry: any) => ({
      id: entry["yt:videoId"].join(""),
      channelId: entry["yt:channelId"].join(""),
      title: entry.title?.join(""),
      publishedAt: entry.published?.join(""),
      description: entry["media:group"]?.[0]?.["media:description"]?.join(""),
      thumbnailUrl: entry["media:group"]?.[0]?.["media:thumbnail"]?.[0]?.$?.url,
    }));

    await prisma.$transaction(
      videos.map((video) => {
        return prisma.youtubeVideo.upsert({
          create: {
            ...video,
            channelId: undefined,
            channel: {
              connectOrCreate: {
                where: {
                  id: video.channelId,
                },
                create: {
                  id: video.channelId,
                  author: result.feed.author?.[0].name?.join(""),
                },
              },
            },
          },
          update: { ...video, channelId: undefined },
          where: {
            id: video.id,
          },
        });
      })
    );

    return NextResponse.json(
      {
        status: "Success",
        message: `Finished processing ${videos.length} video(s)`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Could not process the notification", error);
    return NextResponse.json(
      {
        status: "Error",
      },
      { status: 500 }
    );
  }
}
