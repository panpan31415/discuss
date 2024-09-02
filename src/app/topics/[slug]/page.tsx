import CreatePostForm from "@/components/posts/create-post-form";

type TopicsPageProps = {
    params: {
        slug: string;
    };
};

export default async function TopicsPage({ params }: TopicsPageProps) {
    const { slug } = params;
    const topic = await prisma?.topic.findFirst({
        where: {
            slug,
        },
    });
    return (
        <div className='grid grid-cols-4 gap-4 p-4'>
            <div className='col-span-3'>
                <h1 className='text-2xl font-bold mb-2'>{slug}</h1>
            </div>
            <div>{topic?.description}</div>
            <CreatePostForm slug={slug} />
        </div>
    );
}
