import { ReactNode } from 'react';

import Footer from './Footer';
import Navbar from './Navbar';

interface HomeLayoutProps {
  children: ReactNode;
}
export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Navbar />
      <section className="size-full min-h-[calc(100vh-66px)] p-16">
        {children}
      </section>
      <Footer />
    </div>
  );
}
