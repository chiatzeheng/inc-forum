import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const postRouter = createTRPCRouter({

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

    createNewTopic: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      
    }),

    fetchNextPage: protectedProcedure
    .input(
      z.object({
        limit: z.string(),
        cursor: z.number().nullish(), 
        pageParam: z.number().min(1),
        topicName: z.string().nullish(),
      }),
    )
    .query(async ({ctx, opts}) => {
  
      try {
      
        let whereClause = {}
    
        if (opts.topicName) {
          whereClause = {
            topicName: {
              name: opts.topicName,
            },
          }
        } 
    
        const posts = await ctx.db.post.findMany({
          take: parseInt(opts.limit),
          skip: (parseInt(opts.pageParam) - 1) * parseInt(opts.limit), // skip should start from 0 for page 1
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            topic: true,
            author: true,
            comments: true,
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
          comments: true,
          subreddit: true,
        },
        take: 4 // 4 to demonstrate infinite scroll, should be higher in production
      })
    }),

 


});
