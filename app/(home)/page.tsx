import { Tweet } from "@prisma/client";
import db from "@/lib/db";
import getSession from "@/lib/session";
import Link from "next/link";
import AddTweet from "@/components/AddTweet";

export default async function Home() {
  async function getTweets(page: number): Promise<Tweet[]> {
    "use server";
    const session = await getSession();
    return await db.tweet.findMany({
      where: {
        userId: session.id,
      },
      orderBy: {
        created_at: "desc",
      },
      take: 1,
    });
  }
  const tweet = await getTweets(1);
  return (
    <div className="flex flex-col justify-center items-center gap-5 w-full h-screen">
      <div className="flex justify-start w-1/4">
        <div className="flex justify-between items-center w-full">
          <AddTweet />
          <h1 className="self-center">Tweet</h1>
          <div className="pl-4 invisible">{"👈"}</div>
        </div>
      </div>
      {tweet?.map((item, index) => (
        <Link
          key={index}
          href={`/tweets${item.id}`}
          className="flex justify-between border w-1/4 p-3"
        >
          <span>{item.tweet}</span>
          <span>{item.userId}</span>
        </Link>
      ))}
      {tweet.length === 0 && <div>No tweet found...</div>}
    </div>
  );
}
