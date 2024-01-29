'use client'
import PostFeed from "@/app/components/PostFeed"
import FirstTime from "./FirstTime"
import { api } from '@/trpc/react'

const GeneralFeed = () => {

  const { data: posts, isLoading } = api.post.getAllPosts.useQuery({
    limit: 10,
    pageParam: 1,
  })


  if (!posts) return <FirstTime/>
  else return <PostFeed initialPosts={posts} isLoading={isLoading} />
}

export default GeneralFeed