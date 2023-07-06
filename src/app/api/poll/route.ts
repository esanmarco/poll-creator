import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Todo:
 
 * 1. Create new poll
 * 2. Create new option records
 *    - Make sure pollId is set for each option
 * 3. Return pollId
 */

const postBodySchema = z.object({
  title: z.string(),
  options: z.array(z.string()),
});
export type PostBody = z.infer<typeof postBodySchema>;

const prismaClient = new PrismaClient();

export async function POST(req: Request) {
  const body: PostBody = await req.json();

  // create a new poll
  const poll = await prismaClient.poll.create({
    data: {
      title: body.title,
    },
  });

  // create new options
  await prismaClient.option.createMany({
    data: body.options.map((option) => ({
      pollId: poll.id,
      text: option,
    })),
  });

  return NextResponse.json({
    pollId: poll.id,
  });
}
