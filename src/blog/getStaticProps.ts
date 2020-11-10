import getAllPostPreviews from './getAllPostPreviews';

export async function getStaticProps() {
  return {
    props: {
      posts: getAllPostPreviews().map((post: any) => ({
        link: post.link,
        title: post.module.meta.title,
      })),
    },
  };
}
