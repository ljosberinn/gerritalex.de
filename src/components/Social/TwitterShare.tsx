import type { WithChildren } from '@/types';

type TwitterShareProps = WithChildren<{
  text: string;
}>;

export function TwitterShare({
  text,
  children,
}: TwitterShareProps): JSX.Element {
  return (
    <a
      className="text-theme-link hover:underline"
      target="_blank"
      rel="noreferrer"
      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`}
      data-size="large"
    >
      {children}
    </a>
  );
}
