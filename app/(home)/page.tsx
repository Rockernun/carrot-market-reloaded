import { Tweet } from "@prisma/client";
import db from "@/lib/db";
import getSession from "@/lib/session";
import Link from "next/link";

export default async function Home() {
  async function getTweets(): Promise<Tweet[]> {
    "use server";
    const session = await getSession();
    return await db.tweet.findMany({
      where: {
        userId: session.id,
      },
    });
  }
  const tweet = await getTweets();
  return (
    <div>
      <h1>Tweet</h1>
      {tweet?.map((item, index) => (
        <Link
          key={index}
          href={`/tweet/${item.id}`}
          className="flex justify-between border w-1/4"
        >
          <span>{item.tweet}</span>
          <span>{item.userId}</span>
        </Link>
      ))}
    </div>
  );
}
