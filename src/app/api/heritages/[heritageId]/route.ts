import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { heritageId: string } },
) {
  try {
    const { heritageId } = params;

    const heritage = await db.heritage.delete({
        where: {
            id: heritageId
        }
    })

    return NextResponse.json(heritage);
  } catch (error) {
    console.log("erro");
    return new NextResponse("Internal error!", { status: 500 });
  }
}
