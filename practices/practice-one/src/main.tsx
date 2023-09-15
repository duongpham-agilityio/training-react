import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

// Fetcher
import { SWRConfig } from 'swr';

// Routes
import { routes } from 'routes';

// Contexts
import { AppProvider } from 'contexts';

// Helpers
import { fetcher } from 'helpers';

// Styles
import 'styles/main.module.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <AppProvider>
        <RouterProvider router={routes} />
      </AppProvider>
    </SWRConfig>
  </React.StrictMode>
);
