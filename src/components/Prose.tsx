import type { WithChildren } from "./InternalLink";

export function Prose({ children }: WithChildren): JSX.Element {
  return <div className="prose lg:prose-xl max-w-none">{children}</div>;
}
