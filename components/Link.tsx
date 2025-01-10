/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link';
import type { LinkProps } from 'next/link';
import type { AnchorHTMLAttributes } from 'react';

const CustomLink = ({ href, ...rest }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isInternalLink = href && href.startsWith('/');

  if (isInternalLink) {
    return <Link className="break-words" href={href} {...rest} />;
  }

  const isAnchorLink = href && href.startsWith('#');

  if (isAnchorLink) {
    return <a className="break-words" href={href} {...rest} />;
  }

  return (
    <a className="break-words" target="_blank" rel="noopener noreferrer" href={href} {...rest} />
  );
};

export default CustomLink;
