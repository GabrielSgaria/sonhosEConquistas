import { FiEdit3, FiTrash2 } from "react-icons/fi";

interface HeritageCardProps {
    icon: string,
    label: string,
    value: number,
}

export function HeritageCard({icon, label, value}: HeritageCardProps){
    return (
        <div className="flex gap-x-4 overflow-hidden">
          <div className="bg-zinc-800 min-w-60 h-48 rounded hover:bg-zinc-800/80 hover:font-semibold transition-all">
            <div className="py-2 flex justify-end gap-x-1 px-3">
              <button className="p-0.5 hover:bg-zinc-700 rounded transition-colors">
                <FiEdit3 />
              </button>
              <button className="p-0.5 hover:bg-zinc-700 rounded transition-colors">
                <FiTrash2 />
              </button>
            </div>
            <div className="flex items-center justify-center flex-col gap-y-4">
              <span className="text-4xl">{icon}</span>
              <p className="font-semibold">{label}</p>
              <p className="text-xl font-bold">
                {value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          </div>
        </div>
    )
}