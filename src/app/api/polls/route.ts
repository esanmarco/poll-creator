import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import z from "zod";

/**
 * Todos:
 * https://github.com/esanmarco/poll-creator/blob/next-prep/src/app/api/poll/route.ts
 * Prisma:
 * 1. export client to utils

 * API:
 * Invalidate cache (https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating#using-on-demand-revalidation)
 */

const payload = z.object({
  title: z.string(),
  options: z.array(z.string()),
});

type Payload = z.infer<typeof payload>;

const prismaClient = new PrismaClient();

export async function POST(req: Request) {
  const body: Payload = await req.json();
  /**
   * {
   *    title: 'string',
   *    options: ['string', 'string', 'string']
   * }
   */

  const poll = await prismaClient.poll.create({
    data: {
      title: body.title,
    },
  });

  await prismaClient.option.createMany({
    data: body.options.map((option: any) => ({
      pollId: poll.id,
      text: option,
    })),
  });

  revalidatePath("/");

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
  });
}

export async function GET(req: Request) {
  const poll = await prismaClient.poll.findMany({
    include: {
      options: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return NextResponse.json(poll);
}
