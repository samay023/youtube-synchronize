import { forcePublish, subscribeToChannel } from "@/lib/pubsubhubbubApi";

export const POST = async (request: Request) => {
  const searchParams = new URL(request.url).searchParams;
  const id = searchParams.get("channelId");

  if (!id) return new Response("Missing channelId", { status: 400 });

  // Subscribes to the channel's feed
  await subscribeToChannel(id);

  // Force a publish after 10 seconds
  await new Promise((resolve) => setTimeout(() => resolve(true), 2000));

  await forcePublish(id);

  return new Response("Success", { status: 200 });
};
