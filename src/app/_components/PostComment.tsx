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

interface PostCommentProps {
  comment: ExtendedComment;
  layer: number;
  session: string;
}

const PostComment = ({ comment, layer, session }: PostCommentProps) => {
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


  const { mutate: deleteComment } = api.comment.deleteComment.useMutation({
    onSuccess: () => {
      toast.success("Comment deleted");
      setIsDeleted(true);
      refetch();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to delete comment");
    },
  });

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
          <div className="flex justify-end">
            { comment.author.id == session && !comment.deleatedAt ? ( <Trash
              className="h-4 w-4"
              onClick={() => deleteComment({ id: comment.id })}
            />) : (null)}
          </div>
        </div>

      <div className="ms-2 mt-2 border-l-2 border-slate-300 px-5">
        {comment.deleatedAt ? (
          <div className="text-md mt-2 text-zinc-900">[deleted]</div>
        ) : (
          <p className="text-md mt-2 text-zinc-900">{comment.text}</p>
        )}
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
                <Eye className="mr-1.5 h-4 w-4" />
                View Comments ({comments.length})
              </Button>
            ) : null}

            { comment.deleatedAt ? (  <Button
              variant="ghost"
              disabled
              size="sm"
              className="mt-2 w-fit p-2"
            >
              <MessageSquare className="mr-1.5 h-4 w-4" />
              Reply
            </Button>) : ( <Button
              onClick={() => {
                setIsReplying(!isReplying);
              }}
              variant="ghost"
              size="sm"
              className="mt-2 w-fit p-2"
            >
              <MessageSquare className="mr-1.5 h-4 w-4" />
              Reply
            </Button>)}
          </div>
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
                        session={session}
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
