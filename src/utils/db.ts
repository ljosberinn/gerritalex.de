import type { ViewData } from '@/components/Blog/Post/PostPreviewList';
import knex from 'knex';
import type { GetStaticPropsResult } from 'next';

export const createInstance = (): knex =>
  knex({
    client: 'mysql',
    connection: {
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      password: process.env.DB_PW,
      user: process.env.DB_USER,
    },
  });

export const promisify = <T>(thenable: Promise<T>): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    // eslint-disable-next-line promise/prefer-await-to-then
    thenable.then(resolve).catch(reject);
  });

export const tableName = 'gerritalex-de';

export const getStaticBlogViewData = async (): Promise<
  GetStaticPropsResult<{ viewData: ViewData[] }>
> => {
  try {
    const instance = createInstance();

    const data = await promisify(
      instance(tableName)
        .select('total', 'pathname')
        .where('pathname', 'like', '%/posts/%'),
    );

    return {
      props: {
        // migrating RowDataPacket to objects
        viewData: data.map((dataset) => ({ ...dataset })),
      },
      revalidate: 24 * 60 * 60,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    return {
      props: {
        viewData: [],
      },
      revalidate: 600,
    };
  }
};
