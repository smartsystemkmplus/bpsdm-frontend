import ModalPortal from '@components/Modals/ModalPortal';
import Providers from '@services/providers';
import getAnonymousId from '@utils/getAnonymousId';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

/**
 * Responsible for rendering the root layout of the application.
 *
 * - Responsible for setting the font family and the color scheme of the application.
 * - Responsible for setting the metadata of the application.
 * - Responsible for setting the global styles of the application.
 * - Responsible for entry point of the provider of the application.
 */

function Layout() {
  useEffect(() => {
    getAnonymousId();
  }, []);

  return (
    <Providers>
      <ModalPortal />
      <Outlet />
    </Providers>
  );
}

export default Layout;
