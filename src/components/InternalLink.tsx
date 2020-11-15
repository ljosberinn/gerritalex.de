import type { WithChildren } from '@/types';
import Link from 'next/link';

type InternalLinkProps = WithChildren<{
  href: string;
  className?: string;
}>;

export function InternalLink({
  href,
  children,
  className = '',
  ...rest
}: InternalLinkProps): JSX.Element {
  return (
    <Link href={href}>
      <a
        className={`text-orange-400 hover:text-orange-500 ${className}`}
        {...rest}
      >
        {children}
      </a>
    </Link>
  );
}
