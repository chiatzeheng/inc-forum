import EditorOutput from "@/app/_components/EditorOutput";
import { FC } from "react";
import CommentsSection from "@/app/_components/CommentsSection";
import { api } from "@/trpc/server";

interface pageProps {
  params: {
    slug: string[];
  };
}

const page: FC<pageProps> = async ({ params }) => {
  //first slug is the post id, second slug is the comment id
  const [postId, commentId] = params.slug;
  //if there is no comment id, then the second slug is undefined
  //TRPC Query for Posts
  const post = await api.comment.getPost.query({ id: postId ?? "" });
  // //if the post is not found, return a message
  if (!post) return <div>Post not found</div>;
  return (
    <>
      <div className="py-4">
        <div className="rounded-xl bg-white p-10">
          <div className="mb-5 border-b border-gray-300 pb-4">
            <h1 className="mb-1 text-2xl font-bold">{post.title}</h1>
            <p className="mb-3 text-sm text-zinc-900 underline underline-offset-2">
              {post.topic.name}
            </p>
            <p className="text-sm text-gray-500">
              By {post.author.name} on {post.createdAt.toLocaleString()}
            </p>
          </div>
          {/* render post content using EditorOutput as we content is stored in json (using editor js) */}
          <EditorOutput content={post.content} />
        </div>
        {/* render comments section */}
        <CommentsSection postId={post.id} commentId={commentId} />
      </div>
    </>
  );
};

export default page;
