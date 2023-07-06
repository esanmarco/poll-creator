import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

/**
 * Todos:
 * https://github.com/esanmarco/poll-creator/blob/next-prep/src/app/api/poll/route.ts
 * Prisma:
 * 1. export client to utils

 * API:
 * 1. Validate request body
 * 2. Create new poll
 * 3. Create new option records
 *    - Make sure pollId is set for each option
 * 4. Invalidate cache (https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating#using-on-demand-revalidation)
 * 5. Return pollId
 */

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
