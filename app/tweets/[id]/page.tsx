import { Prisma, Tweet } from "@prisma/client";
import db from "@/lib/db";
import Link from "next/link";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: { id: string } }) {
  async function getTweet(id: number): Promise<Tweet | null> {
    try {
      const tweet = await db.tweet.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          created_at: true,
          updated_at: true,
          like: true,
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });
      return tweet;
    } catch (e) {
      return null;
    }
  }

  export type TweetDetail = Prisma.PromiseReturnType<typeof getTweet>;

  async function cacheTweets(id: number) {
    const session = await getSession();
    const userId = session.id;
    const cachedOperate = nextCache(getTweet, ["tweet-detail"], {
      tags: [`tweet-detail-${id}`],
    });
    return cachedOperate(id);
  }

  async function likeStatus(tweetId:number, userId:number) {
    const isLiked = await db.like.findUnique({
      where : {
        id: {
          tweetId, 
          userId,
        }
      }
    })
    const likeCount = await db.like.count({
      where: {
        tweetId,
      }
    });
    return {
      likeCount,
      isLiked:Boolean(isLiked);
    };
  }

  async function getCachedLikeStatus(tweetId:number) {
    const session = await getSession();
    const userId = session.id;
    const cacheOperate = nextCache(likeStatus, ["tweet-like-status"], {
      tags:[`like-status-${tweetId}`],
    });
    return cacheOperate(tweetId, userId);
  }

  async function getComments(tweetId:number) {
    const comment = await db.comment.findMany({
      where : {
        tweetId,
      },
      include: {
        user: {
          select: {
            username:true,
          }
        }
      }
    });
    return comment;
  }

  export default async function TweetDetail({params}: {params: {id:string}}) {
    const id = Number(params.id);
    const tweet = await cacheTweets(id);
    if(isNaN(id)) {
      return notFound();
    }
    if (!tweet) {
      return notFound();
    }
  }

  const comment = await getComments(id);
  const { likeCount, isLiked } = await getCachedLikeStatus(id);
  return (
    <div>
      <TweetDetail tweet={tweet} likeCount={likeCount} isLiked={isLiked}/>
      <section>
        <h3>
          답글
          <span>
            {comment.length}
          </span>
        </h3>
        <ul>
          {comment.map(c => (
            <TweetComment 
              key={comment.id}
              id={comment.id}
              created_at={comment.created_at}
              updated_at={comment.updated_at}
              user={comment.user}
            />
          ))}
        </ul>
        {comment.length === 0 && <p>No tweets found...</p>}
      </section>
    </div>
  );
}
function nextCache(likeStatus: (tweetId: number, userId: number) => Promise<{ likeCount: number; isLiked: boolean; }>, arg1: string[], arg2: { tags: string[]; }) {
  throw new Error("Function not implemented.");
}

