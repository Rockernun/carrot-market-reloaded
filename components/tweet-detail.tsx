import { TweetDetail } from "@/app/tweets/[id]/page";
import { formatToTimeAgo } from "@/lib/utils";
import TweetLikeBtn from "./tweet-btn";

interface TweetDetailProps {
  tweet: TweetDetail;
  likeCount: number;
  isLiked: boolean;
}

export default function TweetDetail({
  tweet,
  likeCount,
  isLiked,
}: TweetDetailProps) {
  return (
    <>
      <div className="bg-neutral-500 size-28 rounded-md" />
      <div className="flex flex-col gap-5 w-4/5">
        <div className="flex flex-row justify-between *:text-sm">
          <h4 className="font-semibold">{tweet?.user.username}</h4>
          <span>
            {tweet
              ? formatToTimeAgo(tweet.created_at.toStrin())
              : "알 수 없음..."}
          </span>
        </div>
        <p className="w-full">{tweet?.context}</p>
        <TweetLikeBtn
          isLiked={isLiked}
          likeCount={likeCount}
          tweetId={tweet!.id}
        />
      </div>
    </>
  );
}
