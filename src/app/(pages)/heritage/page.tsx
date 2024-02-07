import { AddConqueredHeritageButton } from "@/components/add-conquered-heritage-button";
import { AddConqueredHeritageSheet } from "@/components/add-conquered-heritage-sheet";
import { HeritageCard } from "@/components/heritage-card";
import { db } from "@/lib/prisma";
import { $Enums, Heritage } from "@prisma/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { getHeritages } from "@/actions/get-heritages";
import { AddWantedHeritageButton } from "@/components/add-wanted-heritage-button";

export default async function HeritagePage() {
  const conqueredHeritages = await getHeritages({
    stage: 'CONQUERED',
    max: 10
  })

  const wantedHeritages = await getHeritages({
    stage: 'WANTED',
    max: 10
  })

  return (
    <div className="flex flex-col gap-16 overflow-hidden">
      <div className="flex flex-col gap-2">
        
        <div className="flex justify-between">

          <p className="text-sm font-semibold">
            <span className="text-xs">{`\u{1F518}`} </span>
            Patrimônios Conquistados:
          </p>

          <Link href='#' className="pr-2 text-sm underline hover:font-semibold transition-all">Ver todos</Link>
          
        </div>
    
        <div className="flex flex-col gap-x-14 gap-y-4 lg:flex-row">
          <AddConqueredHeritageButton />

          

         <div className="flex flex-1">

            <Carousel opts={{align: 'start'}} className="w-full select-none lg:max-w-3xl xl:max-w-4xl">
              <CarouselContent className="-ml-4" >
                
                {!!conqueredHeritages.length ? (
                  conqueredHeritages.map( (heritage) => (
                    
                    <CarouselItem key={heritage.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <HeritageCard 
                      icon={heritage.emoji} 
                      label={heritage.name}
                      value={heritage.value}
                      id={heritage.id}

                      />
                    </CarouselItem>

                  ))
                ) : (
                      <CarouselItem> 
                        <div className="flex h-48 w-full max-w-5xl flex-1 items-center bg-zinc-800/50">
                          <p className="mx-auto text-sm text-zinc-400">
                              Nenhum patrimônio cadastrado.
                          </p>

                        </div>
                      </CarouselItem>)}

                
              </CarouselContent>
              <CarouselPrevious className="border-zinc-400 bg-zinc-700 text-zinc-200 hover:bg-zinc-700/60 hover:text-white/60"/>
              <CarouselNext className="border-zinc-400 bg-zinc-700 text-zinc-200 hover:bg-zinc-700/60 hover:text-white/60"/>
            </Carousel>

         </div>

        </div>
      </div>
      <div className="flex flex-col gap-2">
        
        <div className="flex justify-between">

          <p className="text-sm font-semibold">
            <span className="text-xs">{`\u{1F518}`} </span>
            Patrimônios Desejado:
          </p>

          <Link href='#' className="pr-2 text-sm underline hover:font-semibold transition-all">Ver todos</Link>
          
        </div>
    
        <div className="flex flex-col gap-x-14 gap-y-4 lg:flex-row">
          <AddWantedHeritageButton />

          

         <div className="flex flex-1">

            <Carousel opts={{align: 'start'}} className="w-full select-none lg:max-w-3xl xl:max-w-4xl">
              <CarouselContent className="-ml-4" >
                
                {!!wantedHeritages.length ? (
                  wantedHeritages.map( (heritage) => (
                    
                    <CarouselItem key={heritage.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <HeritageCard 
                      icon={heritage.emoji} 
                      label={heritage.name}
                      value={heritage.value}
                      id={heritage.id}

                      />
                    </CarouselItem>

                  ))
                ) : (
                      <CarouselItem> 
                        <div className="flex h-48 w-full max-w-5xl flex-1 items-center bg-zinc-800/50">
                          <p className="mx-auto text-sm text-zinc-400">
                              Nenhum patrimônio cadastrado.
                          </p>

                        </div>
                      </CarouselItem>)}

                
              </CarouselContent>
              <CarouselPrevious className="border-zinc-400 bg-zinc-700 text-zinc-200 hover:bg-zinc-700/60 hover:text-white/60"/>
              <CarouselNext className="border-zinc-400 bg-zinc-700 text-zinc-200 hover:bg-zinc-700/60 hover:text-white/60"/>
            </Carousel>

         </div>

        </div>
      </div>
    </div>
  );
}
