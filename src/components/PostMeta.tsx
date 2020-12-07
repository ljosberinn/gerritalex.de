export type PostMetaProps = {
  meta: {
    date: string;
    description: string;
    icons?: string;
    title: string;
    views: number;
    tags: string[];
  };
};

export function PostMeta({ meta }: PostMetaProps): JSX.Element {}
