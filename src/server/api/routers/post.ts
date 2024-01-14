import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const postRouter = createTRPCRouter({

    createNewTopic: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      
    }),

    fetchNextPage: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1),
        cursor: z.number().nullish(), 
        pageParam: z.string().min(1),
        topicName: z.string().nullish(),
      }),
    )
    .query(async ({ctx, input}) => {
  
      try {
      
        let whereClause = {}
    
        if (input.topicName) {
          whereClause = {
            topicName: {
              name: input.topicName,
            },
          }
        } 
    
        const posts = await ctx.db.post.findMany({
          take: input.limit,
          skip: (parseInt(input.pageParam) - 1) * (input.limit ?? 1),
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            topic: true,
            author: true,
            comment: true,
          },
          where: whereClause,
        })
    
        return new Response(JSON.stringify(posts))
      } catch (error) {
        return new Response('Could not fetch posts', { status: 500 })
      }
    
    }),

    getAllPosts: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(), 
        pageParam: z.number().min(1),
        topicName: z.string().nullish(),
      }),
    )
    .query(async ({ctx}) => {
      return await ctx.db.post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          author: true,
          comment: true,
          topic: true,
        },
        take: 4 // 4 to demonstrate infinite scroll, should be higher in production
      })
    }),

 


});
