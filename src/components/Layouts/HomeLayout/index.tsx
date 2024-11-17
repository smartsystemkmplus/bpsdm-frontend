import cn from '@utils/cn';
import { ReactNode } from 'react';

import Footer from './Footer';
import Navbar from './Navbar';

interface HomeLayoutProps {
  children: ReactNode;
  className?: string;
  withNavbar?: boolean;
}
export default function HomeLayout({
  children,
  className,
  withNavbar = true,
}: HomeLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      {withNavbar && <Navbar />}
      <section
        className={cn(
          'size-full min-h-[calc(100vh-66px)] p-16',
          className
        )}
      >
        {children}
      </section>
      <Footer />
    </div>
  );
}
