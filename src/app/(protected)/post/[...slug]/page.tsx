import EditorOutput from "@/app/components/EditorOutput";
import { db } from "@/server/db";
import { FC } from "react";
import CommentsSection from "@/app/components/CommentsSection";
import ProfileInfo from "@/app/components/ProfileInfo";

interface pageProps {
  params: {
    slug: string[];
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const postId = params.slug[0];
  const commentId = params.slug[1];

  const post = await db.post.findUnique({
    include: {
      author: {
        select: {
          name: true,
        },
      },
      topic: {
        select: {
          name: true,
        },
      },
    },
    where: {
      id: postId,
    },
  });

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
          <EditorOutput content={post.content} />
        </div>
        <CommentsSection postId={post.id} commentId={commentId} />
      </div>
      <ProfileInfo />
    </div>
  );
};

export default page;
