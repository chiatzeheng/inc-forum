'use client'

import { Button } from '@/app/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Label } from '@/app/components/ui/label'
import { Textarea } from '@/app/components/ui/textarea'
import { api } from '@/trpc/server'

interface CreateCommentProps {
  postId: string
  replyToId?: string
}

const CreateComment = ({ postId, replyToId }: CreateCommentProps) => {
  const [input, setInput] = useState<string>('')
  const router = useRouter()

//   const { mutate: comment, isLoading } = useMutation({
//     mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
//       const payload: CommentRequest = { postId, text, replyToId }

//       const { data } = await axios.patch(
//         `/api/subreddit/post/comment/`,
//         payload
//       )
//       return data
//     },

    const { mutuate: comment , isLoading} = api.post.createComment.useMutation({
        onSuccess: () => {
            router.refresh()
            setInput('')
        },
    })


  return (
    <div className='grid w-full gap-1.5'>
      <Label htmlFor='comment'>Your comment</Label>
      <div className='mt-2'>
        <Textarea
          id='comment'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder='What are your thoughts?'
        />

        <div className='mt-2 flex justify-end'>
          <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => comment({ postId, text: input, replyToId })}>
            Post
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateComment