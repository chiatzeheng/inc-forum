import PostFeed from "@/app/_components/PostFeed";
import FirstTime from "./FirstTime";
import { api } from "@/trpc/react";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { unstable_noStore as noStore } from "next/cache";

//Client Component

const GeneralFeed = () => {
  noStore();
  const { data: posts, isLoading } = api.post.getAllPosts.useQuery({
    limit: 10,
    pageParam: 1,
  });

  return isLoading ? (
    <Skeleton className="col-span-2 flex flex-col space-y-6 rounded-lg p-8 " />
  ) : !posts ? (
    <FirstTime />
  ) : (
    <PostFeed initialPosts={posts} isLoading={isLoading} />
  );
};

export default GeneralFeed;
