import { Button } from '@/app/components/ui/button'
import { notFound } from 'next/navigation'
import { api } from "@/trpc/react"

interface pageProps {
  params: {
    slug: string
  }
}

const page = async ({ params }: pageProps) => {

    const topic = await api.post.getAllPosts.query({ subredditSlug: params.slug })

  if (!topic) return notFound()
  return (
    <div className='flex flex-col items-start gap-6'>
      {/* heading */}
      <div className='border-b border-gray-200 pb-5'>
        <div className='-ml-2 -mt-2 flex flex-wrap items-baseline'>
          <h3 className='ml-2 mt-2 text-base font-semibold leading-6 text-gray-900'>
            Create Post
          </h3>
          <p className='ml-2 mt-1 truncate text-sm text-gray-500'>
            in r/{params.slug}
          </p>
        </div>
      </div>

      {/* form */}
      

      <div className='w-full flex justify-end'>
        <Button type='submit' className='w-full' form='subreddit-post-form'>
          Post
        </Button>
      </div>
    </div>
  )
}

export default page