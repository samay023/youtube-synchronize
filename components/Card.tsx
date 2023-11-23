import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export default function Card({ id, title, description, imageUrl }: Props) {
  return (
    <Link
      className="w-56 rounded overflow-hidden shadow-lg cursor-pointer hover:bg-gray-100 max-h-96"
      href={`/videos/${id}`}
    >
      <Image
        className="w-full h-36"
        width={480}
        height={360}
        src={imageUrl}
        alt=""
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p
          className="text-gray-700 text-ellipsis overflow-hidden"
          title={description}
        >
          {description}
        </p>
      </div>
    </Link>
  );
}
