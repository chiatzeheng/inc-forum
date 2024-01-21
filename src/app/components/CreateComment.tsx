"use client";

import { FC, useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface CreateCommentProps {
  postId: string;
  replyToId?: string;
}

const CreateComment: FC<CreateCommentProps> = ({ postId, replyToId }) => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();

  const { mutate: comment, isLoading } = api.comment.createComment.useMutation({
    onSuccess: () => {
      router.refresh();
      setInput("");
      toast.success("Comment posted");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to post comment");
    },
  });

  return (
    <div className="mb-4 grid w-full gap-1.5">
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
            disabled={input.length === 0 || isLoading}
            onClick={() => {
              comment({ postId, replyToId, text: input });
            }}
          >
            {isLoading && <Loader2 className="mr-1.5 h-4 w-4" />}
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
