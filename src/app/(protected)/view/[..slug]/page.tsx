import EditorOutput from "@/app/components/EditorOutput";
import { db } from "@/server/db";
import { FC } from "react";
import CommentsSection from "@/app/components/CommentsSection";
import ProfileInfo from "@/app/components/ProfileInfo";
import { api } from "@/trpc/react"

interface pageProps {
  params: {
    slug: string[];
  };
}

const page: FC<pageProps> = async ({ params }) => {

  //first slug is the post id, second slug is the comment id
  //if there is no comment id, then the second slug is undefined
  const [postId, commentId ] = params.slug

  //TRPC Query for Posts
  const { data: post } = api.comment.getPost.useQuery({ id: postId})

  //if the post is not found, return a message
  if (!post) return <div>Post not found</div>;

  return (
    <div className="flex flex-row gap-x-7">
      <div className="basis-2/3">
        <div className="rounded-xl bg-white p-10">
          <div className="mb-5 border-b border-gray-300 pb-4">
            <h1 className="mb-2 text-2xl font-bold">{post.title}</h1>
            <p className="text-sm text-gray-500">
              By {post.author.name} on {post.createdAt.toLocaleString()}
            </p>
            <p className="mt-3 inline-block rounded-2xl bg-green-200 px-4 py-1">
              {post.topic.name}
            </p>
          </div>
          {/* render post content using EditorOutput as we content is stored in json (using editor js) */}
          <EditorOutput content={post.content} />
        </div>
        {/* render comments section */}
        <CommentsSection postId={post.id} commentId={commentId} />
      </div>
      <ProfileInfo />
    </div>
  );
};

export default page;
