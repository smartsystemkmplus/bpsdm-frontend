import MenuBar, { MenuBarItem } from '@components/MenuBar';
import SimpleBreadcrumbs, {
  Crumb,
} from '@components/SimpleBreadcrumbs';
import { ReactNode } from 'react';

import AsideContentLayout from '../AsideContentLayout';

interface CreationPageLayoutProps {
  crumbs: Crumb[];
  children: ReactNode;
  footer: ReactNode;
  menuTitle?: string;
  menus: MenuBarItem[];
  asideMenuVariant?: 'single' | 'nested';
}

export default function CreationPageLayout({
  crumbs,
  children,
  footer,
  menuTitle,
  menus = [],
  asideMenuVariant = 'single',
}: CreationPageLayoutProps) {
  const asideElm = (() => {
    if (asideMenuVariant === 'single')
      return <MenuBar title={menuTitle} menus={menus} />;

    // TODO: Implement 'nested' variant
    if (asideMenuVariant === 'nested') return null;

    return null;
  })();
  return (
    <div className="flex flex-col gap-5">
      <SimpleBreadcrumbs crumbs={crumbs} />

      <AsideContentLayout aside={asideElm}>
        {children}
      </AsideContentLayout>

      <div className="fixed bottom-0 right-0 z-[3] w-[calc(100%-4rem)] border-t bg-base-white p-5">
        {footer}
      </div>
    </div>
  );
}
