import { IconType } from "react-icons";

interface SolutionCardProps {
  icon: IconType;
  title: string;
  description: string;
  highlight: string;
}

export default function SolutionCard({
  icon,
  title,
  description,
  highlight,
}: SolutionCardProps) {
  return (
    <div
      className={
        "flex flex-col px-4 py-8 space-y-4 bg-linear-150 from-primary-400 from-0% via-primary-500 via-30% to-primary-700 to-100% text-neutral-50 rounded-3xl border-4 border-primary-500 shadow-primary-900/65 shadow-lg cursor-default " +
        "transition-transform duration-300 ease-in-out " +
        "hover:-translate-y-2"
      }
    >
      <div className="flex flex-row items-center gap-4">
        {icon({ size: "6rem" })}
        <h3 className="text-3xl text-left hyphens-auto line-clamp-2">
          {title}
        </h3>
      </div>
      <div className="flex-1 flex flex-col justify-between gap-4">
        <p className="text-lg hyphens-auto">{description}</p>
        <span className="block w-full text-xl text-center align-bottom place-self-end">
          {highlight}
        </span>
      </div>
    </div>
  );
}
