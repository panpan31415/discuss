"use server";

import { auth } from "@/auth";
import paths from "@/path";
import { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { z } from "zod";

const createTopicSchema = z.object({
    name: z
        .string()
        .min(2)
        .regex(/^[a-zA-Z-. #]+$/),
    description: z.string().min(10, { message: "at least 10 characters" }),
});

type FormState = {
    succeeded?: boolean;
    errors?: {
        name?: string[];
        description?: string[];
        _form?: string[];
    };
};

export async function createTopic(formState: FormState, formData: FormData): Promise<FormState> {
    const result = createTopicSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
    });
    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors };
    }
    const { name, description } = result.data;
    const session = await auth();
    if (!session?.user) {
        return {
            errors: {
                _form: ["Please sign in"],
            },
        };
    }
    let topic: Topic | undefined;
    try {
        topic = await prisma?.topic.create({
            data: {
                slug: slugify(name),
                description,
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
                    _form: ["failed while saving topic"],
                },
            };
        }
    }
    revalidatePath(paths.home());
    redirect(paths.topic(topic?.slug || ""));
}
