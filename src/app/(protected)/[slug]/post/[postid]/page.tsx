import CommentsSection from '@/app/components/CommentSection'
import EditorOutput from '@/app/components/EditorOutput'

import { Post, User } from '@prisma/client'
import { ArrowBigDown, ArrowBigUp, Loader2 } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { api } from '@/trpc/server'

interface TopicPage {
  params: {
    postId: string
  }
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const TopicPage = async ({ params }: TopicPage) => {


  const posts = await api.post.findUnique.query({id: params.postId})

  if (!posts ) return notFound()
  return (
    <div>
      <div className='h-full flex flex-col sm:flex-row items-center sm:items-start justify-between'>
       

        <div className='sm:w-0 w-full flex-1 bg-white p-4 rounded-sm'>
          <p className='max-h-40 mt-1 truncate text-xs text-gray-500'>
            Posted by {posts?.title } 
            {new Date(posts?.createdAt ?? '').toString()}
          </p>
          <h1 className='text-xl font-semibold py-2 leading-6 text-gray-900'>
            {posts?.title}
          </h1>

          <EditorOutput content={posts?.content} />
          <Suspense
            fallback={
              <Loader2 className='h-5 w-5 animate-spin text-zinc-500' />
            }>
            <CommentsSection postId={posts?.id} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default TopicPage