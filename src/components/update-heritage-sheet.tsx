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
import { useEffect, useState } from "react";
import { $Enums } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  createHeritage,
  getHeritagesById,
  updateHeritage,
} from "@/lib/actions";

interface UpdateHeritageSheetProps {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateHeritageSheet({
  open,
  id,
  onOpenChange,
}: UpdateHeritageSheetProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [heritageName, setHeritageName] = useState("");
  const [heritageValue, setHeritageValue] = useState("");

  useEffect(() => {
    async function loadHeritage() {
      const data = await getHeritagesById(id);
      if (data) {
        setSelectedEmoji(data.emoji);
        setHeritageName(data.name);
        const valueParsed = data.value / 100;
        setHeritageValue(valueParsed.toString());
      }
    }
    loadHeritage();
  }, [id]);

  async function handleUpdateHeritage() {
    try {
      setIsLoading(true);
      if (!selectedEmoji) {
        throw new Error("Selecione o emoji");
      }
      if (!heritageName) {
        throw new Error("Preencha o nome");
      }

      const valueInCents = heritageValue ? parseFloat(heritageValue) * 100 : 0;

      await updateHeritage({
        id: id,
        emoji: selectedEmoji,
        name: heritageName,
        value: valueInCents,
      });

      onOpenChange(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="border-zinc-700 bg-zinc-800 text-white">
        <SheetHeader>
          <SheetTitle className="text-white">
            Adicionar patrimônio conquistado
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
            disabled={isLoading}
            onClick={handleUpdateHeritage}
            className="ml-auto rounded-md bg-black px-6 py-2 text-sm font-semibold text-white hover:bg-black/50 disabled:opacity-50 disabled:hover:bg-black"
          >
            Salvar
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
