"use client";

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
import { $Enums } from "@prisma/client";
import { useRouter } from "next/navigation";

interface AddWantedHeritageSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddWantedHeritageSheet({
  open,
  onOpenChange,
}: AddWantedHeritageSheetProps) {
  const router = useRouter();

  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [heritageName, setHeritageName] = useState("");
  const [heritageValue, setHeritageValue] = useState("");

  async function handleCreateWantedHeritage() {
    try {
      if (!selectedEmoji) {
        throw new Error("Selecione o emoji");
      }
      if (!heritageName) {
        throw new Error("Preencha o nome");
      }

      const newHeritage = await fetch("/api/heritages", {
        method: "POST",
        body: JSON.stringify({
          emoji: selectedEmoji,
          name: heritageName,
          value: heritageValue ? parseFloat(heritageValue) : 0,
          stage: $Enums.Stage.WANTED,
        }),
      });
      const data = await newHeritage.json();
      console.log(data);

      setSelectedEmoji("");
      setHeritageName("");
      setHeritageValue("");
      onOpenChange(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="border-zinc-700 bg-zinc-800 text-white">
        <SheetHeader>
          <SheetTitle className="text-white">
            Adicionar patrimônio desejado
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <span className="text-sm font-semibold ">Selecione o ícone</span>
            <div className="text-4xl">
              <EmojiPicker
                currentEmoji={selectedEmoji}
                onChange={(emoji) => setSelectedEmoji(emoji)}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold">
              Descrição do patrimônio
            </label>
            <input
              placeholder="Ex.: Apartamento"
              className="h-8 rounded bg-zinc-700 px-2 text-sm"
              value={heritageName}
              onChange={(e) => setHeritageName(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold">Valor do patrimônio</label>
            <input
              className="h-8 rounded bg-zinc-700 px-2 text-sm"
              value={heritageValue}
              onChange={(e) =>
                setHeritageValue(e.target.value.replace(/\D/g, ""))
              }
            />
            <span className="text-xs text-muted-foreground">
              Apenas números
            </span>
          </div>

          <button
            onClick={handleCreateWantedHeritage}
            className="ml-auto rounded-md bg-black px-6 py-2 text-sm font-semibold text-white hover:bg-black/50"
          >
            Salvar
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
