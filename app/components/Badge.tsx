import { Link } from "@remix-run/react";

type Props = {
  label: string;
  linkTo: string;
}

export function Badge({ label, linkTo }: Props) {
  return (
    <div className="not-prose">
      <Link
        to={linkTo}
        className="group relative inline-block text-sm font-medium text-blue-700 no-underline"
      >
        <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-blue-700 transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />

        <span className="relative block border border-current bg-white px-4 py-2">
          {label}
        </span>
      </Link>
    </div>
  );
}
