import { PropsWithChildren } from 'react';

export function TableWrapper({ children }: PropsWithChildren) {
  return (
    <div className="w-full overflow-x-auto">
      <table>{children}</table>
    </div>
  );
}
