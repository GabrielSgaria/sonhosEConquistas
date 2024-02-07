import { db } from "@/lib/prisma";

interface GetHeritages{
    stage: 'CONQUERED'|'WANTED',
    max?: number,
}

export async function getHeritages(params: GetHeritages) {
    return await db.heritage.findMany({
        where: {
          stage:params.stage
        },
        orderBy: {
          createdAt: "desc",
        },
        take: params.max
      });    
}
export async function getHeritagesById(id: string) {
  return await db.heritage.findUnique({
      where: {
        id
      },
    });    
}