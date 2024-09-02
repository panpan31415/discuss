"use client";
import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from "@nextui-org/react";
import FormButton from "../submit-button";
import { useFormState } from "react-dom";
import * as actions from "@/actions";

type CreatePostFormProps = {
    slug: string;
};
export default function CreatePostForm({ slug }: CreatePostFormProps) {
    const [formState, action] = useFormState(actions.createPost.bind(null, slug), {});

    return (
        <Popover placement='left'>
            <PopoverTrigger>
                <Button color='primary'>Create a Post</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className='flex flex-col gap-4 p-4 w-80'>
                        <h3 className='text-lg'>Create a post</h3>
                        <Input
                            name='title'
                            label='Title'
                            labelPlacement='outside'
                            placeholder='Title'
                            isInvalid={Boolean(formState?.errors?.title)}
                            errorMessage={formState?.errors?.title}
                        />
                        <Textarea
                            name='content'
                            label='Content'
                            labelPlacement='outside'
                            placeholder='write your post here'
                            isInvalid={Boolean(formState?.errors?.content)}
                            errorMessage={formState?.errors?.content}
                        />
                        {formState?.errors?._form ? (
                            <div className='p-2 bg-red-200 border border-red-400 rounded'>
                                {formState?.errors?._form.join(", ")}
                            </div>
                        ) : null}
                        <FormButton>Create Post</FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}
