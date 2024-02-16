"use client";
import { deleteHeritage } from "@/lib/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { LuLoader2 } from "react-icons/lu";
import { ChangeHeritageStageButton } from "./change-heritage-stage-button";
import { $Enums } from "@prisma/client";
import { UpdateHeritageButton } from "./update-heritage-button";

interface HeritageCardProps {
  icon: string;
  label: string;
  value: number;
  id: string;
  stage: $Enums.Stage
}

export function HeritageCard({ icon, label, value, id, stage }: HeritageCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDeleteHeritage() {
    try {
      setIsLoading(true);
      await deleteHeritage(id);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-48 min-w-60 select-none rounded bg-zinc-800 transition-all hover:bg-zinc-800/80 hover:font-semibold">
      <div className="flex p-2">

        <ChangeHeritageStageButton id={id} name={label} emoji={icon} value={value} stage={stage}/>

        <div className="ml-auto flex gap-x-1">
          
          <UpdateHeritageButton id={id}/>

          <button
            disabled={isLoading}
            onClick={handleDeleteHeritage}
            className="rounded p-0.5 transition-colors hover:bg-zinc-700"
          >
            {isLoading ? <LuLoader2 className="animate-spin" /> : <FiTrash2 />}
          </button>
        </div>
      </div>
      <Link href={`/heritage/${id}`}>
        <div className="flex flex-col items-center justify-center gap-y-4">
          <span className="text-4xl">{icon}</span>
          <p className="font-semibold">{label}</p>
          <p className="text-xl font-bold">
            {(value / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
      </Link>
    </div>
  );
}
