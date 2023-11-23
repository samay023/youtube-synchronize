import { youtube_v3 } from "googleapis";

// This should really be a service with hexagonal architecture s but lazily done
export const getVideo = async (id: string) => {
  if (!process.env.YT_API_KEY) throw new Error("Missing YT_API_KEY");

  const result = await new youtube_v3.Youtube({
    key: process.env.YT_API_KEY,
  }).videos.list({
    id: [id],
    part: ["snippet"],
    key: process.env.YT_API_KEY,
  });

  return result.data.items?.[0];
};

export const searchVideos = async (searchKey: string, channelId?: string) => {
  if (!process.env.YT_API_KEY) throw new Error("Missing YT_API_KEY");

  const result = await new youtube_v3.Youtube({}).search.list({
    q: searchKey,
    channelId,
    part: ["snippet"],
    maxResults: 10,
    key: process.env.YT_API_KEY,
  });

  return result.data?.items ?? [];
};
