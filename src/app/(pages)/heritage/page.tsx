import { AddConqueredHeritageButton } from "@/components/add-conquered-heritage-button";
import { AddConqueredHeritageSheet } from "@/components/add-conquered-heritage-sheet";
import { HeritageCard } from "@/components/heritage-card";
import { db } from "@/lib/prisma";
import { $Enums, Heritage } from "@prisma/client";

export default async function HeritagePage() {
  const conqueredHeritages = await db.heritage.findMany({
    where: {
      stage: $Enums.Stage.CONQUERED,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const wantedHeritages = await db.heritage.findMany({
    where: {
      stage: $Enums.Stage.WANTED,
    },
  });

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">
          <span className="text-xs">{`\u{1F518}`} </span>
          Patrimônios Conquistados:
        </p>
        <div className="flex flex-wrap gap-4">
          <AddConqueredHeritageButton />
          {conqueredHeritages.map((heritage: Heritage) => (
            <HeritageCard
              key={heritage.id}
              icon={heritage.emoji}
              label={heritage.name}
              value={heritage.value}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
