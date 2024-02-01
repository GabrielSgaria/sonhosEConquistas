"use client"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LuSmile } from "react-icons/lu";
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"

interface EmojiPickerProps{
  currentEmoji: string,
  onChange: (emoji:string) => void,
}

export function EmojiPicker({currentEmoji, onChange}: EmojiPickerProps) {
  return (
    <Popover>
      <PopoverTrigger>
        {currentEmoji ? (
          <span className="text-4xl">{currentEmoji}</span>
        ) : (
          <LuSmile className="text-zinc-500 hover:text-zinc-600 transition " />          
        )}

      </PopoverTrigger>
      <PopoverContent className="border-none bg-transparent shadow-none drop-shadow-none " > 
        <Picker onEmojiSelect={(emoji:any) => onChange(emoji.native)} data={data} locale="pt" previewPosition="none" />
      </PopoverContent>
    </Popover>
  );
}