"use client";

import { useState } from "react";
import { AddWantedHeritageSheet } from "./add-wanted-heritage-sheet";

export function AddWantedHeritageButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="flex h-48 min-w-60 items-center justify-center rounded bg-zinc-800 transition-all hover:bg-zinc-800/80 hover:font-semibold">
        + Adicionar novo
      </button>
      <AddWantedHeritageSheet open={open} onOpenChange={setOpen}/>
    </>
  );
}
