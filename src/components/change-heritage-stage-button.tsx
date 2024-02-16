"use client";

import { PiMedal, PiMedalFill } from "react-icons/pi";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { changeHeritageStage } from "@/lib/actions";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface ChangeHeritageStageButtonProps {
  id: string;
  emoji: string;
  value: number;
  name: string;
  stage: "CONQUERED" | "WANTED";
}

export function ChangeHeritageStageButton({
  id,
  emoji,
  value,
  name,
  stage,
}: ChangeHeritageStageButtonProps) {
  const confetti = useConfettiStore();
  async function handleChangeHeritageStage() {
    try {
      const newStage = stage === "WANTED" ? "CONQUERED" : "WANTED";

      await changeHeritageStage(newStage, id);
      if(newStage === 'CONQUERED'){
        confetti.onOpen()
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="rounded p-0.5 transition-colors hover:bg-zinc-700">
        {stage === "WANTED" ? (
          <PiMedal className="size-5" />
        ) : (
          <PiMedalFill className="size-5" />
        )}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmação</AlertDialogTitle>
          <AlertDialogDescription>
            Deseja mudar o status ou patrimônio para{" "}
            {stage === "WANTED" ? (
              <span className="font-bold text-black">Conquistado</span>
            ) : (
              <span className="font-bold text-black">Desejado</span>
            )}
            ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleChangeHeritageStage}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
