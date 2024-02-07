import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { TRPCClientError } from "@trpc/client";

export const commentRouter = createTRPCRouter({
  //get the post with the author and topic
  getPost: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.post.findUnique({
        include: {
          author: {
            select: {
              name: true,
            },
          },
          topic: {
            select: {
              name: true,
            },
          },
        },
        where: {
          id: input.id,
        },
      });
    }),
  createComment: protectedProcedure
    .input(
      z.object({
        text: z.string().min(1),
        postId: z.string().min(1),
        replyToId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user) {
        throw new TRPCClientError("You must be logged in to comment");
      }
      try {
        const comment = await ctx.db.comment.create({
          data: {
            text: input.text,
            postId: input.postId,
            replyToId: input.replyToId,
            authorId: ctx.session.user.id,
          },
        });
        return comment;
      } catch (err) {
        if (err instanceof z.ZodError) {
          return new TRPCClientError(err.message);
        } else {
          console.log(err);
          throw new TRPCClientError("Something went wrong");
        }
      }
    }),
  getComments: protectedProcedure
    .input(
      z.object({
        postId: z.string().min(1),
        commentId: z.string().optional(),
        replyIdToId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      console.log(input);
      const comments = await ctx.db.comment.findMany({
        where: {
          postId: input.postId,
          //if commentId is undefined, means the comment is not continuing from a thread, so set replytoId to null as comment
          //isnt a replying to another comment
          replyToId: input.replyIdToId === undefined && input.commentId === undefined ? null : input.replyIdToId,
          //if commentId is defined, means the comment is continuing from a thread, so set replytoId to commentId as comment
          id: input.commentId,
        },
        include: {
          author: true,
        },
        orderBy: {
          //earliest comments first
          createdAt: "asc",
        },
      });
      return comments;
    }),

  deleteComment: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.comment.update({
        where: { id: input.id },
        data: { deleatedAt: new Date() },
      });
    }),
});
