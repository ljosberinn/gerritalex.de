import type { HTMLProps } from "react";

import { cs } from "../utils/classNames";

type ExternalLinkProps = HTMLProps<HTMLAnchorElement> & {
  color?: string;
  hoverColor?: string;
  className?: string;
};

export function ExternalLink({
  color,
  hoverColor,
  className,
  children,
  ...rest
}: ExternalLinkProps): JSX.Element {
  return (
    <a
      rel="noopener noreferrer"
      target="_blank"
      className={`font-medium ${cs(color, hoverColor, className)}`}
      {...rest}
    >
      {children}
    </a>
  );
}
