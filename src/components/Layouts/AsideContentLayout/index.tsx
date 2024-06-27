import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface AsideContentLayoutProps {
  children: ReactNode;
  aside: ReactNode;
  stickyAside?: boolean;
}

export default function AsideContentLayout({
  children,
  aside,
  stickyAside = true,
}: AsideContentLayoutProps) {
  return (
    <div className="flex gap-5">
      <aside
        className={twMerge(
          'w-[300px] shrink-0 self-start',
          stickyAside && 'sticky top-20 z-10'
        )}
      >
        {aside}
      </aside>

      <div className="flex w-full flex-col gap-5 pb-14 pl-3">
        {children}
      </div>
    </div>
  );
}
