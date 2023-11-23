import prisma from "@/prisma/client";
import ResyncButton from "./ResyncButton";

const getAllExistingChannels = () => {
  return prisma.youtubeChannel.findMany({});
};

export default async function Channel() {
  const channels = await getAllExistingChannels();
  return (
    <table className="table-auto shadow-md w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th className="px-4 py-2">Id</th>
          <th className="px-4 py-2">Author</th>
          <th className="px-4 py-2">Resync from Google Pubsubhubub</th>
        </tr>
      </thead>
      <tbody>
        {channels.map((channel) => (
          <tr key={channel.id}>
            <td className="border px-4 py-2">{channel.id}</td>
            <td className="border px-4 py-2">{channel.author}</td>
            <td className="border px-4 py-2">
              <ResyncButton id={channel.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
