import type { WithChildren } from '@/types';

export function Code({ children }: WithChildren): JSX.Element {
  return (
    <code className="text-red-600 bg-gray-200 inline-block p-1 rounded-md">
      {children}
    </code>
  );
}
