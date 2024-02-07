import { getHeritagesById } from "@/actions/get-heritages";
import { AddConqueredHeritageSheet } from "@/components/add-conquered-heritage-sheet";
import { HeritageCard } from "@/components/heritage-card";
import { FiEdit3, FiTrash2 } from "react-icons/fi";

interface HeritageIdPageProps {
  params: {
    id: string;
  };
}

export default async function HeritageIdPage({
  params: { id },
}: HeritageIdPageProps) {
  const heritage = await getHeritagesById(id);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <div className="flex justify-center">
        <span className="text-6xl md:text-8xl">{heritage?.emoji}</span>
      </div>
      <div className="flex items-center justify-center gap-3">
        <p className="text-2xl font-bold md:text-3xl">{heritage?.name}</p>
        <span className="h-1 w-4 bg-zinc-700" />
        <p className="text-2xl font-bold md:text-3xl">
          {((heritage?.value ?? 0) / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
      <div className="flex justify-center">
        <p className="text-pretty md:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          aliquid tenetur nesciunt eius impedit minus similique odio quae,
          quaerat incidunt cumque, cum architecto, voluptate beatae alias
          facilis velit dignissimos quis!
        </p>
      </div>
    </div>
  );
}
