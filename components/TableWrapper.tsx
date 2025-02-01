import { PropsWithChildren } from 'react';

export default function TableWrapper({ children }: PropsWithChildren) {
  return (
    <div className="w-full overflow-x-auto">
      <table>{children}</table>
    </div>
  );
}
