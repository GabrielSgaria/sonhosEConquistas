import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const data = await req.json();
        const valueInCents = data.value*100;
        const heritage = await db.heritage.create({
            data: {
                emoji: data.emoji,
                name: data.name,
                value: valueInCents,
                stage: data.stage,
            }
        })
        return NextResponse.json(heritage);      
    } catch (error) {
        console.log("erro");
        return new NextResponse("Internal error!", {status:500})
    }
}