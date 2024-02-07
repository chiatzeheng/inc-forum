"use server"
import { db } from "@/server/db";
import { FC } from "react";
import CreateComment from "./CreateComment";
import PostComment from "./PostComment";
import GoBackButton from "./GoBackButton";
import { getAuthSession } from "@/server/auth";

interface CommentsSectionProps 
{
  postId: string;
  commentId: string | undefined;
}

const CommentsSection  = async ({
  commentId,
  postId,
}: CommentsSectionProps) => {


  const comments = await db.comment.findMany({
    where: {
      postId: postId,
      //if commentId is undefined, means the comment is not continuing from a thread, so set replytoId to null as comment
      //isnt a replying to another comment
      replyToId: commentId ? undefined : null,
      //if commentId is defined, means the comment is continuing from a thread, so set replytoId to commentId as comment
      id: commentId,
    },
    include: {
      author: true,
    },
    orderBy: {
      //latest comments first
      createdAt: "desc",
    },
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
        commentId && comments.length ? (
          <GoBackButton postId={postId} />
        ) : null
      }
      {comments.map((comment) => {
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
