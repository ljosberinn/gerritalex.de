import type { WithChildren } from '@/types';
import Link from 'next/link';

type InternalLinkProps = WithChildren<{
  href: string;
  className?: string;
}>;

export function InternalLink({
  href,
  children,
  className = 'text-theme-link underline',
  ...rest
}: InternalLinkProps): JSX.Element {
  return (
    <Link href={href}>
      <a className={className} {...rest}>
        {children}
      </a>
    </Link>
  );
}
