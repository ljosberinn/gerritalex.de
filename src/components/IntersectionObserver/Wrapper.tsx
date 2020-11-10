import { useIntersect } from '@/hooks/useIntersect';
import { useState } from 'react';

type Props = {
  children: (show: boolean) => React.ReactElement | null;
};

/**
 * This wrapper component use render props pattern
 * to lazily render a component using an intersection observer
 */
export function IOWrapper({ children }: Props): JSX.Element {
  const [show, setShow] = useState(false);
  const wrapperRef = useIntersect<HTMLDivElement>({
    onIntersect: () => {
      setShow(true);
    },
    onlyOnce: true,
  });

  return <div ref={wrapperRef}>{children(show)}</div>;
}
