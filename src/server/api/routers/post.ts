import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure
} from "@/server/api/trpc";
import { TRPCClientError } from "@trpc/client";

export const postRouter = createTRPCRouter({

  fetchNextPage: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1),
        cursor: z.number().nullish(),
        pageParam: z.string().min(1),
        topicName: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        let whereClause = {};

        if (input.topicName) {
          whereClause = {
            topicName: {
              name: input.topicName,
            },
          };
        }

        const posts = await ctx.db.post.findMany({
          take: input.limit,
          skip: (parseInt(input.pageParam) - 1) * (input.limit ?? 1),
          orderBy: {
            createdAt: "desc",
          },
          include: {
            topic: true,
            author: true,
            comment: true,
          },
          where: whereClause,
        });

        return new Response(JSON.stringify(posts));
      } catch (error) {
        return new Response("Could not fetch posts", { status: 500 });
      }
    }),

  getAllPosts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(),
        pageParam: z.number().min(1),
        topicName: z.string().nullish(),
      }),
    )
    .query(async ({ ctx }) => {
      return await ctx.db.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: true,
          comment: true,
          topic: true,
        },
        take: 4, // 4 to demonstrate infinite scroll, should be higher in production
      });
    }),

  findFirst: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
       return await ctx.db.topic.findFirst({
        where: {
          name: input.slug,
        },
      });

    }),
  
    findUnique: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.post.findUnique({
        where: {
          id: input.id,
        },
      })
    }),
  createNewPost: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        topicId: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { title, content, topicId } = input;

      await ctx.db.post.create({
        data: {
          title,
          content,
          authorId: ctx.session.user.id,
          topicId,
        },
      });

      return new Response("OK");
    }),

    findManyComments : publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
     return await ctx.db.comment.findMany({
        where: {
          postId: input.id,
          replyToId: null, 
        },
        include: {
          author: true,
          replies: {
            include: {
              author: true,
            },
          },
        },
      })    
    }),


    createComment: publicProcedure
    .input(z.object({ text: z.string().min(1), postId: z.string().min(1), replyToId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      try {
        await ctx.db.comment.create({
          data: {
            text: input.text,
            postId: input.postId,
            authorId: ctx.session.user.id , 
            replyToId: input.replyToId,
            updatedAt: new Date(), 
            userId: ctx.session.user.id , 
          },
        });

        return new Response('OK');
      } catch (error) {
        if (error instanceof z.ZodError) {
          return new TRPCClientError(error.message)
        }
      }
    }),

  })