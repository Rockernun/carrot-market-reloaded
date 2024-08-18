import { formatToTimeAgo } from "@/lib/utils";

interface TweetCommentProps {
  id: number;
  context: string;
  created_at: Date;
  user: {
    username: string;
  };
  updated_at: Date;
}

export default function TweetComment({
  context,
  id,
  created_at,
  user,
}: TweetCommentProps) {
  return (
    <li className="w-full">
      <div className="bg-neutral-500 size-28 rounded-md" />
      <div className="flex flex-col gap-5 w-4/5">
        <div className="flex flex-row justify-between *:text-sm">
          <h4 className="font-semibold">{user.username}!</h4>
          <span>{formatToTimeAgo(created_at.toString())}</span>
        </div>
        <p className="w-full">{context}</p>
      </div>
    </li>
  );
}
