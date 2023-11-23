export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-10 gap-y-3">
      <p>Welcome to YT sync dashboard</p>
      <p>To get started, click on Sync Videos and search for a video</p>
      <p>This will then sync the video into the db for future use</p>
      <p>
        You can also force any of the channels that were added part of the sync
        to use GoogleHubPubBub push
      </p>
      <p>
        it calls a webhook thats part of this server and syncs all the public
        videos under the channel
      </p>
    </main>
  );
}
