const paths = {
    home: () => {
        return "/";
    },
    topics: (slug: string) => {
        return `/topics/${slug}`;
    },
    createTopic: (slug: string) => {
        return `/topics/${slug}/new`;
    },
    createPost: (slug: string) => {
        return `/topics/${slug}/posts/new`;
    },
    showPost: ({ topicSlug, postId }: { topicSlug: string; postId: number }) => {
        return `/topics/${topicSlug}/posts/${postId}`;
    },
};
export default paths;
