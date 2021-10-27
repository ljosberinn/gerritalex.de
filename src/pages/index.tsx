import type { PageConfig } from "next";
import Head from "next/head";

export default function Index(): JSX.Element {
  return (
    <>
      <Head>
        <title>Gerrit Alex | Fullstack Web Software Engineer</title>
      </Head>
      <h2 className="text-xl">
        Gerrit is rebuilding this site. Come back at some later point...
      </h2>
    </>
  );
}

export const config: PageConfig = {
  unstable_runtimeJS: false,
};
