"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface GetHeritages {
  stage: "CONQUERED" | "WANTED";
  max?: number;
}

interface CreateHeritageProps {
  emoji: string;
  name: string;
  value: number;
  stage: "CONQUERED" | "WANTED";
}

export async function getHeritages(params: GetHeritages) {
  return await db.heritage.findMany({
    where: {
      stage: params.stage,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: params.max,
  });
}

export async function getHeritagesById(id: string) {
  return await db.heritage.findUnique({
    where: {
      id,
    },
  });
}

export async function createHeritage(data: CreateHeritageProps) {
  try {
    const valueInCents = data.value * 100;
    await db.heritage.create({
      data: {
        emoji: data.emoji,
        name: data.name,
        value: valueInCents,
        stage: data.stage,
      },
    });
  } catch (error) {
    console.log("erro");
  }
  revalidatePath("/heritage");
}

export async function deleteHeritage(id: string) {
  try {
    await db.heritage.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log("erro");
  }
  revalidatePath("/heritage");
}
