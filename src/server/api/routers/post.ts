import { z } from "zod";
import { useSession } from "next-auth/react";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import type { Post } from "@prisma/client";

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        content: z.string().min(1).max(12000),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session?.user.id || "";
      const post = await ctx.prisma.post.create({
        data: {
          authorId: authorId,
          content: input.content,
        },
      });
      return post;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
});
