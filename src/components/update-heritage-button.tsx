'use client'
import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { UpdateHeritageSheet } from "./update-heritage-sheet";

interface UpdateHeritageButtonProps {
    id: string
}

export function UpdateHeritageButton({id}: UpdateHeritageButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="rounded p-0.5 transition-colors hover:bg-zinc-700"
      >
         <FiEdit3 />
      </button>
      <UpdateHeritageSheet id={id} open={open} onOpenChange={setOpen} />
    </>
  );
}
