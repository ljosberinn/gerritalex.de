import type { WithChildren } from '@/types';
import type { MouseEvent, HTMLProps } from 'react';

type ExternalLinkProps = WithChildren<{
  href: string;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}> &
  HTMLProps<HTMLAnchorElement>;

export function ExternalLink({
  href,
  className = '',
  onClick,
  children,
}: ExternalLinkProps): JSX.Element {
  return (
    <a
      className={`${className} text-theme-link`}
      href={href}
      onClick={onClick}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}
