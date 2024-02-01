"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EmojiPicker } from "./emoji-picker";
import { useState } from "react";

export function AddHeritageSheet() {
  
  const [selectedEmoji, setSelectedEmoji] = useState("");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex h-48 min-w-60 items-center justify-center rounded bg-zinc-800 transition-all hover:bg-zinc-800/80 hover:font-semibold">
          + Adicionar novo
        </button>
      </SheetTrigger>
      <SheetContent className="border-zinc-700 bg-zinc-800 text-white">
        <SheetHeader>
          <SheetTitle className="text-white">Adicionar patrimônio conquistado</SheetTitle>
          
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <span className="text-sm font-semibold ">Selecione o ícone</span>
            <div className="text-4xl">
              <EmojiPicker currentEmoji={selectedEmoji} onChange={(emoji) => setSelectedEmoji(emoji)}/>
            </div>

          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}
