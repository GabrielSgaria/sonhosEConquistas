"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEdit3, FiTrash2 } from "react-icons/fi";

interface HeritageCardProps {
  icon: string;
  label: string;
  value: number;
  id: string;
}

export function HeritageCard({ icon, label, value, id }: HeritageCardProps) {
  const router = useRouter();

  async function handleDeleteHeritage() {
    try {
      await fetch(`/api/heritages/${id}`, {
        method: "DELETE",
      });

      router.refresh;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-48 min-w-60 select-none rounded bg-zinc-800 transition-all hover:bg-zinc-800/80 hover:font-semibold">
      <div className="flex justify-end gap-x-1 px-3 py-2">
        <button className="rounded p-0.5 transition-colors hover:bg-zinc-700">
          <FiEdit3 />
        </button>
        <button
          onClick={handleDeleteHeritage}
          className="rounded p-0.5 transition-colors hover:bg-zinc-700"
        >
          <FiTrash2 />
        </button>
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
