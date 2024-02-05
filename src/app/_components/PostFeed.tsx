'use client'
import { ExtendedPost } from '@/types/db'
import { useRef } from 'react'
import Post from '@/app/_components/Post'
import { useIntersection } from '@mantine/hooks'

interface PostFeedProps {
  initialPosts: ExtendedPost[]
  topicName?: string
  isLoading?: boolean
}

const PostFeed = ({ initialPosts, isLoading }: PostFeedProps) => {

  const lastPostRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })

  return (
    <div className='flex flex-col col-span-2 space-y-6'>
      {initialPosts.map((post, index) => {

        if (index === initialPosts.length - 1) {
          return (
            <div key={post?.id} ref={ref}>
              <Post
                post={post}
                topicName={post?.topic.name}
                commentAmt={post.comment?.length}
              />
            </div>
          )
        } else {
          return (
            <Post
              key={post.id}
              post={post}
              commentAmt={post.comment?.length}
              topicName={post?.topic.name }
            />
          )
        }
      })}
    </div>
  )
}

export default PostFeed