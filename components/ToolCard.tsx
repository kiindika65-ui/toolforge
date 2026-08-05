import Link from "next/link";

interface ToolCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

export default function ToolCard({
  title,
  description,
  icon,
  link,
}: ToolCardProps) {
  return (
    <Link href={link}>
      <div className="cursor-pointer rounded-2xl bg-white p-6 shadow transition duration-300 hover:-translate-y-2 hover:shadow-xl">

        <div className="text-5xl">
          {icon}
        </div>

        <h3 className="mt-4 text-xl font-bold text-gray-900">
          {title}
        </h3>

        <p className="mt-2 text-gray-600">
          {description}
        </p>

      </div>
    </Link>
  );
}