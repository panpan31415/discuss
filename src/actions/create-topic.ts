"use server";

import { auth } from "@/auth";
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
    console.log(name, description);
    const session = await auth();
    if (!session?.user) {
        return {
            errors: {
                _form: ["Please sign in"],
            },
        };
    }
    // insert db
    return {
        succeeded: true,
    };
    // TODO: revalidate the homepage
}
