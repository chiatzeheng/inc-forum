'use client'

import { ExtendedPost } from '@/types/db'
import { Loader2 } from 'lucide-react'
import { FC, useEffect, useRef } from 'react'
import Post from './Post'
import { useSession } from 'next-auth/react'
import { api } from "@/trpc/react"
import { useIntersection } from '@mantine/hooks'

interface PostFeedProps {
  isLoading : boolean
  initialPosts: ExtendedPost[]
  topicName?: string
}

const PostFeed = ({ initialPosts, topicName, isLoading }: PostFeedProps) => {
  const lastPostRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })
  
  const { data: session } = useSession()

  const { data, fetchNextPage, isFetchingNextPage } = api.post.fetchNextPage.useInfiniteQuery({
    limit: 10,
    topicName: topicName,
    pageParam: 1,
  },
  {
  getNextPageParam: (_, pages) => {
    return pages.length + 1
  },
  initialData: { pages: [initialPosts], pageParams: [1] }})

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage() 
    }
  }, [entry, fetchNextPage])

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts

  if (isLoading) return ( <div>Loading...</div> ) 
  else
  return (
    <ul className='flex flex-col col-span-2 space-y-6'>
      {posts.map((post, index) => {
        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={ref}>
              <Post
                post={post}
                commentAmt={post.comments.length}
                topicName={post.topicName.name}
              />
            </li>
          )
        } else {
          return (
            <Post
              key={post.id}
              post={post}
              commentAmt={post.comments.length}
              subredditName={post.subreddit.name}
              votesAmt={votesAmt}
              currentVote={currentVote}
            />
          )
        }
      })}

      {isFetchingNextPage && (
        <li className='flex justify-center'>
          <Loader2 className='w-6 h-6 text-zinc-500 animate-spin' />
        </li>
      )}
    </ul>
  )
}

export default PostFeed