"use server"
import { db } from "@/server/db";
import { FC } from "react";
import CreateComment from "./CreateComment";
import PostComment from "./PostComment";
import GoBackButton from "./GoBackButton";
import { getAuthSession } from "@/server/auth";
import { api } from "@/trpc/server"

interface CommentsSectionProps {
  postId: string;
  commentId: string | undefined;
}

const CommentsSection  = async ({
  commentId,
  postId,
}: CommentsSectionProps) => {

  const data = await api.comment.getComments.query({
    postId: postId,
    commentId: commentId,
  });

  const { user } = (await getAuthSession())!;

  console.log(user?.id)

  return (
    <div>
      <hr className="my-6 h-px w-full" />
      {/* render create comment component */}
      <CreateComment postId={postId} />
      {
        // if commentId is defined, means the comment is continuing from a thread, so render goback button
        commentId && data.length ? <GoBackButton postId={postId} /> : null
      }
      {data.map((comment) => {
        return (
          <div key={commentId} className="mb-5 rounded-lg bg-white p-3">
            {/* A comment component */}
            <PostComment session={user.id} comment={comment} key={comment.id} layer={1} />
          </div>
        );
      })}
    </div>
  );
};

export default CommentsSection;
