import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure
} from "@/server/api/trpc";
import { TRPCClientError } from "@trpc/client";

export const postRouter = createTRPCRouter({

})