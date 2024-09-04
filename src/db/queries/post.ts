import { Post } from "@prisma/client";
import prisma from "@/db";
export type PostWithData = Post & {
    topic: { slug: string };
    user: {
        name: string | null;
    };
    _count: { comments: number };
};

// export type PostWithData = Awaited<ReturnType<typeof fetchPostByTopicSlug>>[number];

export async function fetchPostByTopicSlug(slug: string):Promise<PostWithData[]> {
    return prisma.post.findMany({
        where: {
            topic: {
                slug,
            },
        },
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true } },
            _count: { select: { comments: true } },
        },
    });
}
