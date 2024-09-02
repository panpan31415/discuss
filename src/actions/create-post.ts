"use server";

import { auth } from "@/auth";
import paths from "@/path";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createPostSchema = z.object({
    title: z
        .string()
        .min(2)
        .regex(/^[a-zA-Z-. #]+$/),
    content: z.string().min(10, { message: "at least 10 characters" }),
});

type FormState = {
    succeeded?: boolean;
    errors?: {
        title?: string[];
        content?: string[];
        _form?: string[];
    };
};

export async function createPost(slug: string, formState: FormState, formData: FormData): Promise<FormState> {
    const result = createPostSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
    });
    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors };
    }
    const { title, content } = result.data;
    const session = await auth();
    if (!session?.user?.id) {
        return {
            errors: {
                _form: ["Please sign in"],
            },
        };
    }
    let post: Post | undefined;

    try {
        let topic = await prisma?.topic.findFirst({
            where: { slug },
        });
        if (!topic) {
            return {
                errors: {
                    _form: [" can't find the topic"],
                },
            };
        }
        post = await prisma?.post.create({
            data: {
                userId: session.user.id,
                topicId: topic.id,
                title,
                content,
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            };
        } else {
            return {
                errors: {
                    _form: ["failed while saving post"],
                },
            };
        }
    }
    revalidatePath(paths.topic(slug));
    redirect(
        paths.showPost({
            topicSlug: slug,
            postId: parseInt(post?.id || "0"),
        }),
    );
}
