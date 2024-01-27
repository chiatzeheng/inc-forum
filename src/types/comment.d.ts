import type { User, Comment } from "@prisma/client";

export type ExtendedComment = Comment & {
    author: User;
};