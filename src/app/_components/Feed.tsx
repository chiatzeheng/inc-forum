import PostFeed from "@/app/_components/PostFeed";
import { api } from "@/trpc/server";
import { unstable_noStore as noStore } from "next/cache";

const GeneralFeed = async () => {
  noStore();
  const data = await api.post.getAllPosts.query({
    limit: 10,
    pageParam: 1,
  });
  const topics = await api.post.getTopic.query();

  return <PostFeed initialPosts={data} topics={topics} />;
};

export default GeneralFeed;
