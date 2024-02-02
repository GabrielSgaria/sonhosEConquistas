"use client";

import { useState } from "react";
import { AddConqueredHeritageSheet } from "./add-conquered-heritage-sheet";

export function AddConqueredHeritageButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="flex h-48 min-w-60 items-center justify-center rounded bg-zinc-800 transition-all hover:bg-zinc-800/80 hover:font-semibold">
        + Adicionar novo
      </button>
      <AddConqueredHeritageSheet open={open} onOpenChange={setOpen}/>
    </>
  );
}
