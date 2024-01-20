import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { TRPCClientError } from "@trpc/client";

export const commentRouter = createTRPCRouter({
  createComment: publicProcedure
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
      console.log(ctx.session.user);
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
          console.log(err)
          throw new TRPCClientError("Something went wrong");
        }
      }
    }),
});
