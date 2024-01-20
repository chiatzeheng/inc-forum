"use client";

import { Comment, User } from "@prisma/client";
import { FC, useRef } from "react";

type ExtendedComment = Comment & {
  author: User;
};

interface PostCommentProps {
  comment: ExtendedComment;
}

const PostComment: FC<PostCommentProps> = ({ comment }) => {
  const commentRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={commentRef} className="flex flex-col rounded-lg p-2">
      <div className="flex items-center">
        <div className="flex items-center gap-x-2">
          <p className="text-sm font-medium text-gray-900">
            {comment.author.name}
          </p>

          <p className="max-h-40 truncate text-xs text-zinc-500">
            {comment.createdAt.toLocaleDateString()}
          </p>
        </div>
      </div>
      <p className="mt-2 text-sm text-zinc-900">{comment.text}</p>
    </div>
  );
};

export default PostComment;
