import { RouterOutputs } from "@/trpc/shared";
import type { Comment, User } from "@prisma/client";

// export type ExtendedComment = Comment & {
//     author: User;
// };

export type ExtendedComment = RouterOutputs["comment"]["getComments"][0]


export type Topic = {
    id: string;
    name: string;
};