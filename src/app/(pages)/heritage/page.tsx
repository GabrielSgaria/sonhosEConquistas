import { AddHeritageSheet } from "@/components/add-heritage-sheet";
import { HeritageCard } from "@/components/heritage-card";
import { FiEdit3, FiTrash2 } from "react-icons/fi";

export default function HeritagePage() {
  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">
          <span className="text-xs">{`\u{1F518}`} </span>
          Patrimônios Conquistados:
        </p>
      <div className="flex gap-4 flex-wrap">
        <AddHeritageSheet/>
        <HeritageCard icon={`\u{1F3E0}`} label="Apto." value={800000} />
      </div>
      </div>
    </div>
  );
}
