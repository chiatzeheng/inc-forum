"use client";
import PostFeed from "@/app/components/PostFeed";
import FirstTime from "./FirstTime";
import { api } from "@/trpc/react";
import { Skeleton } from "@/app/components/ui/skeleton";

//Client Component

const GeneralFeed = () => {
  const { data: posts, isLoading } = api.post.getAllPosts.useQuery({
    limit: 10,
    pageParam: 1,
  });


  return isLoading ? (
    <Skeleton className="h-[20px] w-[100px]" />
  ) : !posts ? (
    <FirstTime />
  ) : (
    <PostFeed initialPosts={posts} isLoading={isLoading} />
  );
};

export default GeneralFeed;
