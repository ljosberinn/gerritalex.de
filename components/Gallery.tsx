import type { ReactNode } from 'react';

// Side by side from sm up; object-contain keeps differently sized media at a shared max height
export function Gallery({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center gap-4 sm:flex-row [&>figure]:min-w-0 [&>figure]:flex-1 [&_img]:max-h-80 [&_img]:object-contain [&_video]:max-h-80">
      {children}
    </div>
  );
}
