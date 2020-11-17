import { createInstance, promisify, tableName } from '@/utils/db';
import type { NextApiRequest, NextApiResponse } from 'next';

const key = 'total';

// eslint-disable-next-line import/no-default-export
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (
    req.method === 'GET' &&
    req.query.pathname &&
    req.headers.referrer?.includes('gerritalex.de')
  ) {
    const { pathname } = req.query;

    try {
      const instance = createInstance();

      const [{ total = 0 } = {}] = await promisify<{ total: number }[]>(
        instance(tableName).select(key).where('pathname', pathname),
      );

      const now = Date.now() / 1000;

      if (!total) {
        await promisify(
          instance(tableName).insert({
            first: now,
            [key]: 1,
            last: now,
            pathname,
          }),
        );

        res.status(201).json({ [key]: 1 });
        return;
      }

      await promisify(
        instance(tableName)
          .increment(key, 1)
          .update('last', now)
          .where('pathname', pathname),
      );

      res.json({ [key]: total + 1 });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      res.status(500).end();
    }
  }

  res.status(400).end();
}
