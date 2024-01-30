'use client'
import { ExtendedPost } from '@/types/db'
import { useRef } from 'react'
import Post from '@/app/components/Post'
import { useIntersection } from '@mantine/hooks'

interface PostFeedProps {
  isLoading : boolean
  initialPosts: ExtendedPost[]
  topicName?: string
}

const PostFeed = ({ initialPosts, isLoading }: PostFeedProps) => {

  const lastPostRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })

  if (isLoading) return ( <div>Loading...</div> ) 
  else return (
    <ul className='flex flex-col col-span-2 space-y-6'>
      {initialPosts.map((post, index) => {

        if (index === initialPosts.length - 1) {
          return (
            <li key={post?.id} ref={ref}>
              <Post
                post={post}
                topicName={post?.topicName}
                commentAmt={post.comment?.length}
              />
            </li>
          )
        } else {
          return (
            <Post
              key={post.id}
              post={post}
              commentAmt={post.comment?.length}
              topicName={post?.topicName }
            />
          )
        }
      })}
    </ul>
  )
}

export default PostFeed