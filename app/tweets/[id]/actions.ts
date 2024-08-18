"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";

export async function LikeCheck(tweetId: number) {
  const session = await getSession();
  await db.like.create({
    data: {
      tweetId,
      userId: session.id,
    },
  });
  revalidateTag(`like-status-${tweetId}`);
}

export async function disLikeCheck(tweetId: number) {
  const session = await getSession();
  await db.like.delete({
    where: {
      id: {
        tweetId,
        userId: session.id,
      },
    },
  });
  revalidateTag(`like-status-${tweetId}`);
}
