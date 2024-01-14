import type { Post, Subreddit, User, Comment } from '@prisma/client'

export type ExtendedPost = Post & {
  id : number
  subreddit: Subreddit
  author: User
  comments: Comment[]
}