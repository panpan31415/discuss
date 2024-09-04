const paths = {
    home: () => {
        return "/";
    },
    topic: (slug: string) => {
        return `/topics/${slug}`;
    },
    createTopic: (slug: string) => {
        return `/topics/${slug}/new`;
    },
    createPost: (slug: string) => {
        return `/topics/${slug}/posts/new`;
    },
    showPost: ({ topicSlug, postId }: { topicSlug: string; postId: string }) => {
        return `/topics/${topicSlug}/posts/${postId}`;
    },
};
export default paths;
