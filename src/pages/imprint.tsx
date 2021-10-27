import type { PageConfig } from "next";

export default function Imprint(): JSX.Element {
  return (
    <>
      <style jsx>
        {`
          .imprint:after {
            white-space: pre-wrap;
            content: "Legal Notice\A Gerrit Alex\A Appenzeller Straße 97\A 81475 Munich, Bavaria, Germany";
          }
        `}
      </style>
      <code className="imprint" />
    </>
  );
}
export const config: PageConfig = {
  unstable_runtimeJS: false,
};
