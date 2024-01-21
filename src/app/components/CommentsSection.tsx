import { db } from "@/server/db";
import { FC } from "react";
import CreateComment from "./CreateComment";
import PostComment from "./PostComment";
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
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <hr className="my-6 h-px w-full" />
      <CreateComment postId={postId} />
      {comments.map((comment) => {
        return (
          <div className="mb-5 rounded-lg bg-white p-3">
            <PostComment comment={comment} key={comment.id} layer={1} />
          </div>
        );
      })}
    </div>
  );
};

export default CommentsSection;
