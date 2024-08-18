"use client";

import { LikeCheck, disLikeCheck } from "@/app/tweets/[id]/actions";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { useOptimistic } from "react";

interface TweetLikeBtnProps {
  likeCount: number;
  isLiked: boolean;
  tweetId: number;
}

export default function TweetLikeBtn({
  likeCount,
  isLiked,
  tweetId,
}: TweetLikeBtnProps) {
  const [state, reducer] = useOptimistic(
    { isLiked, likeCount },
    (prevState, payload) => ({
      isLiked: !prevState.isLiked,
      likeCount: prevState.isLiked
        ? prevState.likeCount - 1
        : prevState.likeCount + 1,
    })
  );
  const dispatch = async () => {
    reducer(undefined);
    if (isLiked) {
      await disLikeCheck(tweetId);
    } else {
      await LikeCheck(tweetId);
    }
  };
  return (
    <form action={dispatch}>
      <button
        className={`flex gap-3 items-center ${
          state.isLiked ? "text-pink-500" : "text-white"
        }`}
      >
        <HandThumbUpIcon className={`size-5`} />
        <span>{state.likeCount}</span>
      </button>
    </form>
  );
}
