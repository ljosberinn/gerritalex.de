import { Link } from "@remix-run/react";
import  { type ReactNode } from "react";

type Props = {
  to: string;
  children: ReactNode;
}

export function InternalLink({ to, children }: Props) {
  const beforeClasses =
    "before:content-[''] before:absolute before:block before:w-full before:h-0.5 before:bottom-0 before:left-0 before:bg-black dark:before:bg-white before:scale-x-0 before:transition-transform duration-300";

  return (
    <Link
      to={to}
      prefetch="intent"
      className={`relative w-fit no-underline ${beforeClasses} hover:before:scale-x-100`}
    >
      {children}
    </Link>
  );
}
