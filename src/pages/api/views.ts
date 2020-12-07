import type { NextApiRequest, NextApiResponse } from "next";

import { createInstance, safePromisify } from "../../utils/db";
import {
  CREATED,
  INTERNAL_SERVER_ERROR,
  NO_CONTENT,
} from "../../utils/statusCodes";

// eslint-disable-next-line import/no-default-export
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (
    req.method === "GET" &&
    req.query.pathname &&
    req.headers.referrer?.includes("gerritalex.de")
  ) {
    const { pathname } = req.query;

    if (Array.isArray(pathname)) {
      return;
    }

    try {
      const instance = createInstance();

      const [{ total = 0 } = {}] = await safePromisify<{ total: number }[]>(
        instance.select("total").where("pathname", pathname)
      );

      const now = Date.now() / 1000;

      if (!total) {
        await safePromisify(
          instance.insert({
            first: now,
            last: now,
            pathname,
            total: 1,
          })
        );

        res.status(CREATED).json({ total: 1 });
        return;
      }

      await safePromisify(
        instance
          .increment("total", 1)
          .update("last", now)
          .where("pathname", pathname)
      );

      res.json({ total: total + 1 });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      res.status(INTERNAL_SERVER_ERROR).end();
    }
  }

  res.status(NO_CONTENT).end();
}
