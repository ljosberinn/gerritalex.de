import knex from "knex";
import type { GetStaticPropsResult } from "next";

export const createInstance = (): knex =>
  knex({
    client: "mysql",
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

export const tableName = "gerritalex-de";
