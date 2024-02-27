"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { $Enums } from "@prisma/client";
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
  const { userId } = auth();
  if (!userId) {
    console.log({ error: "Você precisa estar logado!" });
    return [];
  }
  return await db.heritage.findMany({
    where: {
      stage: params.stage,
      userId,
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
  const { userId } = auth();
  if (!userId) {
    return { error: "Você precisa estar logado!" };
  }
  try {
    const valueInCents = data.value * 100;
    await db.heritage.create({
      data: {
        userId,
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
  const { userId } = auth();
  if (!userId) {
    return { error: "Você precisa estar logado!" };
  }
  try {
    await db.heritage.delete({
      where: {
        id,
        userId,
      },
    });
  } catch (error) {
    console.log("erro");
  }
  revalidatePath("/heritage");
}

export async function changeHeritageStage(
  newStage: "CONQUERED" | "WANTED",
  id: string,
) {
  const { userId } = auth();
  if (!userId) {
    return { error: "Você precisa estar logado!" };
  }
  try {
    await db.heritage.update({
      where: {
        id,
        userId,
      },
      data: {
        stage: newStage,
      },
    });
  } catch (error) {
    console.log("erro");
  }
  revalidatePath("/heritage");
}

interface UpdateHeritageProps {
  id: string;
  name: string;
  value: number;
  emoji: string;
}

export async function updateHeritage(data: UpdateHeritageProps) {
  const { userId } = auth();
  if (!userId) {
    return { error: "Você precisa estar logado!" };
  }
  try {
    await db.heritage.update({
      where: {
        id: data.id,
        userId,
      },
      data: {
        emoji: data.emoji,
        name: data.name,
        value: data.value,
      },
    });
  } catch (error) {
    console.log("erro");
  }
  revalidatePath("/heritage");
}

export async function getHeritagesToChart() {
  try {
    const conquered = await db.heritage.count({
      where: {
        stage: "CONQUERED",
      },
    });
    const wanted = await db.heritage.count({
      where: {
        stage: "WANTED",
      },
    });
    return {
      conquered,
      wanted,
    };
  } catch (error) {
    console.log(error);
    return {
      conquered: 0,
      wanted: 0,
    };
  }
}
