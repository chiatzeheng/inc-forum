"use client";
import PostFeed from "@/app/components/PostFeed";
import FirstTime from "./FirstTime";
import { api } from "@/trpc/react";
import Skeleton  from "@/app/components/Skeleton";

//Client Component

const GeneralFeed = () => {
  const { data: posts, isLoading } = api.post.getAllPosts.useQuery({
    limit: 10,
    pageParam: 1,
  });


  return isLoading ? (
    <Skeleton/>
  ) : !posts ? (
    <FirstTime />
  ) : (
    <PostFeed initialPosts={posts} isLoading={isLoading} />
  );
};

export default GeneralFeed;
