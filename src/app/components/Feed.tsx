'use client'

import PostFeed from '@/app/components/PostFeed'
import { api } from '@/trpc/react'

const GeneralFeed = () => {
 
  const { data: posts, isLoading } = api.post.getAllPosts.useQuery({
    limit: 10,
    pageParam: 1,
  })

  

  return <PostFeed initialPosts={posts} isLoading={isLoading} />
}

export default GeneralFeed