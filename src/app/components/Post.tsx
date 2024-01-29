'use client'

import type { Post, User } from '@prisma/client'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'


const Post = ({post}: Post) => {


  const pRef = useRef<HTMLParagraphElement>(null)
  return (
    <div className='rounded-md bg-white shadow'>
      <div className='px-6 py-4 flex justify-between'>

        <div className='w-0 flex-1'>
          <div className='max-h-40 mt-1 text-xs text-gray-500'>
            {post.topicName ? (
              <>
                <a
                  className='underline text-zinc-900 text-sm underline-offset-2'
                  href={`/view/${post.topicName}`}>
                  {post.topicName || ""}
                </a>
                <span className='px-1'>•</span>
              </>
            ) : null}
            <span>Posted by {"john"}</span>{' '}
            latest date
            {/* need to format the time based on R&D Team */}
          </div>
          <a href={`/view/${post.id!}`}>
            <h1 className='text-lg font-semibold py-2 leading-6 text-gray-900'>
              {post.title}
            </h1>
          </a>

        </div>
      </div>

      <div className='bg-gray-50 z-20 text-sm px-4 py-4 sm:px-6'>
        <Link
          href={`/add/${post.id!}`}
          className='w-fit flex items-center gap-2'>
          <MessageSquare className='h-4 w-4' /> {post.commentAmt} comments
        </Link>
      </div>
    </div>
  )
}
export default Post