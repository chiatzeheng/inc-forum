import { createTRPCRouter } from "@/server/api/trpc";
import { commentRouter } from "./routers/comment";
import { postRouter } from "./routers/post"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  comment: commentRouter,
  post: postRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
