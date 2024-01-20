import { db } from "@/server/db";
import { FC } from "react";
import PostComment from "./PostComment";
import CreateComment from "./CreateComment";

interface CommentsSectionProps {
  postId: string;
  commentId: string | undefined;
}

const CommentsSection: FC<CommentsSectionProps> = async ({
  commentId,
  postId,
}) => {
  const comments = await db.comment.findMany({
    where: {
      postId: postId,
      replyToId: null,
    },
    include: {
      author: true,
      replies: {
        include: {
          author: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <hr className="my-6 h-px w-full" />
      <CreateComment postId={postId} />
      {comments.map((comment) => (
        <div key={comment.id} className="flex flex-col">
          <div className="mb-5 rounded-lg bg-white p-3">
            <PostComment comment={comment} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsSection;
