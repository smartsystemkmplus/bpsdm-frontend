import NiceModal from '@ebay/nice-modal-react';
import { MantineProvider } from '@mantine/core';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React, { useState } from 'react';

import theme from '../../theme';

/**
 * Responsible for providing the context of the application.
 */

function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <NiceModal.Provider>{children}</NiceModal.Provider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default Providers;
