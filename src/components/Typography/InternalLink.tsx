import Link from 'next/link';

type Props = {
  href: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

export const InternalLink: React.FC<Props> = ({
  href,
  children,
  className = `text-theme-link underline`,
  onClick,
  ...rest
}) => {
  return (
    <Link href={href}>
      <a className={className} onClick={onClick} {...rest}>
        {children}
      </a>
    </Link>
  );
};
