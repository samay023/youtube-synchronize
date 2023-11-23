"use client";

interface Props {
  id: string;
}

export default function ResyncButton({ id }: Props) {
  return (
    <button
      className="bg-gray-100 text-sm font-semibold cursor-pointer hover:bg-white text-black w-40 p-2"
      onClick={() => {
        fetch(`/channel/syncChannel?channelId=${id}`, { method: "POST" });
      }}
    >
      Resync
    </button>
  );
}
