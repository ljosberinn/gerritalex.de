import type { QueryBuilder } from "knex";
import knex from "knex";

export type Schema = {
  id: number;
  pathname: string;
  first: number;
  last: number;
  total: number;
};

export const createInstance = (): QueryBuilder<Schema> =>
  knex({
    client: "mysql",
    connection: {
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      password: process.env.DB_PW,
      user: process.env.DB_USER,
    },
  })(tableName);

export const safePromisify = <T>(thenable: Promise<T>): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    // eslint-disable-next-line promise/prefer-await-to-then
    thenable.then(resolve).catch(reject);
  });

const tableName = "gerritalex-de";
