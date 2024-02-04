"use client";

import type { Post } from "@prisma/client";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import EditorOutput from "@/app/_components/EditorOutput";
import { Separator } from "./ui/separator";

interface PostType {
  post: Post;
  topicName: string;
  commentAmt: number;
}

const Post = ({ post, topicName, commentAmt }: PostType) => {
  console.log({ post });
  const pRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className="rounded-md bg-white shadow">
      <div className="flex justify-between px-6 py-4">
        <div className="w-0 flex-1">
          <div className="mt-1 max-h-40 text-xs text-gray-500">
            {topicName ? (
              <>
                <Link
                  className="text-sm text-zinc-900 underline underline-offset-2"
                  href={`/view/${post.id}`}
                >
                  {topicName || ""}
                </Link>
                <span className="px-1">•</span>
              </>
            ) : null}
            <span>Posted by {post?.author.name ?? "John"}</span> created on{" "}
            {post.updatedAt.toLocaleDateString()}
            {/* need to format the time based on R&D Team */}
          </div>
          <Link href={`/view/${post.id!}`}>
            <h1 className="mt-2 py-2 text-3xl font-bold leading-6 text-gray-900">
              {post.title}
            </h1>
              <div className="bg-slate-200 w-full mt-3 h-0.5 mb-4"></div>
            <EditorOutput content={post.content} />
          </Link>
        </div>
      </div>

      <div className="z-20 bg-gray-50 px-4 py-4 text-sm sm:px-6">
        <Link
          href={`/view/${post.id!}`}
          className="flex w-fit items-center gap-2"
        >
          <MessageSquare className="h-4 w-4" /> {commentAmt} comments
        </Link>
      </div>
    </div>
  );
};
export default Post;
