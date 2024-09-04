import paths from "@/path";
import { Chip } from "@nextui-org/react";
import Link from "next/link";
import prisma from "@/db";

export default async function TopicList() {
    const topics = await prisma?.topic.findMany();
    const renderedTopics = topics?.map((topic) => (
        <div key={topic.id}>
            <Link href={paths.topic(topic.slug)}>
                <Chip
                    color='warning'
                    variant='shadow'
                    title={topic.slug}>
                    {topic.slug}
                </Chip>
            </Link>
        </div>
    ));

    return <div className='flex flex-row gap-2 flex-wrap'>{renderedTopics}</div>;
}
