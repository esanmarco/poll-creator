import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prismaClient = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  /**
   * {
   *    title: 'string',
   *    options: ['string', 'string', 'string']
   * }
   */

  const poll = await prismaClient.poll.create({
    data: body,
  });

  return NextResponse.json({
    pollId: poll.id,
  });
}
