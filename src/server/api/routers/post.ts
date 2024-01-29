import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const postRouter = createTRPCRouter({

  fetchNextPage: protectedProcedure
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

  getAllPosts: protectedProcedure
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

    createNewQuestion: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      topic: z.string().min(1),
      content: z.string().min(1),
      title: z.string().min(1), 
}))
    .mutation(async ({ ctx, input }) => {

      console.log(ctx)
      // return await ctx.db.post.create(
      //   {
      //     title: input.title,
      //     content: input.content,
      //     topic: input.topic,
      //     author: ctx.user
      //     authorId: ctx.user.id
      // })
    })

  findFirst: protectedProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
       return await ctx.db.topic.findFirst({
        where: {
          name: input.slug,
        },
      });

    }),
  
    findUnique: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.post.findUnique({
        where: {
          id: input.id,
        },
      })
    }),
  createNewPost: protectedProcedure
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


  })