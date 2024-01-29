import type { Post, Topic, User, Comment } from '@prisma/client'

export type ExtendedPost = Post & {
  topic: Topic
  author: User
}