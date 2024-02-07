"use client";

import { Button } from "./ui/button";
import {
  ArrowRightSquareIcon,
  Eye,
  Loader2,
  MessageSquare,
  Trash,
  X,
} from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ExtendedComment } from "@/types/comment";
import { useSession } from "next-auth/react";
interface PostCommentProps {
  comment: ExtendedComment;
  layer: number;
}

const PostComment: FC<PostCommentProps> = ({ comment, layer }) => {
  //isReplying is a boolean that determines if the user is replying to a comment
  const [isReplying, setIsReplying] = useState(false);
  //input is the text that the user is typing
  const [input, setInput] = useState<string>("");
  //viewMoreComments is a boolean that determines if the user wants to view more comments
  const [viewMoreComments, setViewMoreComments] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false); // New state to track if the comment is deleted
  const router = useRouter();

  //create a comment
  const { mutate: reply, isLoading } = api.comment.createComment.useMutation({
    onSuccess: () => {
      setInput("");
      setIsReplying(false);
      toast.success("Comment posted");
      refetch();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to post comment");
    },
  });

  //get comments that are replying to the comment
  const {
    data: comments,
    refetch,
    isLoading: isLoadingComments,
  } = api.comment.getComments.useQuery({
    postId: comment.postId,
    replyIdToId: comment.id,
  });

  const { data: session } = useSession();

  const { mutate: deleteComment } = api.comment.deleteComment.useMutation({
    onSuccess: () => {
      toast.success("Comment deleted");
      setIsDeleted(true);
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to delete comment");
    },
  });

  if (comment.deleatedAt || isDeleted)
    return <div className="text-sm">[deleted]</div>;
  else
    return (
      <div className="flex flex-col py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between gap-x-2">
            <p className="text-sm font-medium text-gray-900">
              {comment.author.name}
            </p>

            <p className="max-h-40 truncate text-xs text-zinc-500">
              {comment.createdAt.toLocaleDateString()}
            </p>
          </div>
          {comment.author.id === session?.user?.id ? (
            <div className="me-2 flex justify-end rounded-md p-1 hover:cursor-pointer hover:bg-red-500">
              <Trash
                strokeWidth={3}
                className="h-4 w-4 text-red-500 hover:bg-red-500 hover:text-white"
                onClick={() => deleteComment({ id: comment.id })}
              />
            </div>
          ) : null}
        </div>

        <div className="ms-2 mt-2 border-l-2 border-slate-300 px-5">
          <p className="text-md mt-2 text-zinc-900">{comment.text}</p>
          {isLoadingComments ? (
            <div className="mt-3 flex flex-row space-x-2 ">
              {/* Skeleton for "Continue this thread" or "View Comments" button */}
              <div className="h-8 w-48 animate-pulse rounded-md bg-gray-300"></div>

              {/* Skeleton for "Reply" button */}
              <div className="h-8 w-24 animate-pulse rounded-md bg-gray-300"></div>
            </div>
          ) : (
            <div className="mt-3">
              {/* if the layer is 4 means, the thread is too deep to continue rendering in the same page, so render in a diff page */}
              {/* this is where the slugs comes into play and the continuation of the thread will be shown first*/}
              {layer === 4 ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="me-3 w-fit p-2"
                  onClick={() => {
                    router.push(`/view/${comment.postId}/${comment.id}`);
                  }}
                >
                  Continue this thread
                  <ArrowRightSquareIcon className="ms-1.5 mt-0.5 h-5 w-5" />
                </Button>
              ) : comments && comments.length > 0 ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="me-3 w-fit p-2"
                  onClick={() => {
                    setViewMoreComments(!viewMoreComments);
                  }}
                >
                  {!viewMoreComments ? (
                    <>
                      <Eye className="mr-1.5 h-4 w-4" />
                      View Comments ({comments.length})
                    </>
                  ) : (
                    <>
                      <X className="mr-1.5 h-4 w-4" />
                      Close Comments
                    </>
                  )}
                </Button>
              ) : null}
              <Button
                onClick={() => {
                  setIsReplying(!isReplying);
                }}
                variant="ghost"
                size="sm"
                className="mt-2 w-fit p-2"
              >
                <MessageSquare className="mr-1.5 h-4 w-4" />
                Reply
              </Button>
            </div>
          )}
          {isReplying ? (
            <div className="mt-1">
              <Label htmlFor="comment">Your comment</Label>
              <div className="mt-2">
                <Textarea
                  id="comment"
                  placeholder="What are your thoughts"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={1}
                />
                <div className="mt-2 flex justify-end">
                  <Button
                    className="mr-2"
                    onClick={() => {
                      setIsReplying(false);
                      setInput("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={input.length === 0 || isLoading}
                    onClick={() => {
                      reply({
                        postId: comment.postId,
                        replyToId: comment.id,
                        text: input,
                      });
                    }}
                  >
                    {isLoading && <Loader2 className="mr-1.5 h-4 w-4" />}
                    Post
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {comments ? (
          <div>
            {viewMoreComments ? (
              <div className="mt-2">
                {comments.map((comment) => {
                  return (
                    <div
                      className="ms-6 mt-6 rounded-lg bg-white ps-3"
                      key={comment.id}
                    >
                      <PostComment
                        comment={comment}
                        key={comment.id}
                        layer={layer + 1}
                      />
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
};

export default PostComment;
