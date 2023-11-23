export const subscribeToChannel = async (channelId: string) => {
  return fetch(new URL("https://pubsubhubbub.appspot.com/subscribe"), {
    method: "POST",
    body: new URLSearchParams({
      "hub.callback": `${process.env.NGROK_URL}/webhooks/youtube-pub-sub`,
      "hub.topic": `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${channelId}`,
      "hub.verify": "sync",
      "hub.mode": "subscribe",
    }),
  });
};

export const forcePublish = async (channelId: string) => {
  await fetch(new URL("https://pubsubhubbub.appspot.com/publish"), {
    method: "POST",
    body: new URLSearchParams({
      "hub.url": `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${channelId}`,
      "hub.mode": "publish",
    }),
  });
};
