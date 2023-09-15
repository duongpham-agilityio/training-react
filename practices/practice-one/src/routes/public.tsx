import { RouteObject } from 'react-router-dom';

// Layouts
import { MainLayout } from 'layouts';

// Pages
import { HomePage, DetailPage, NotFoundPage } from 'pages';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'products/:id',
        element: <DetailPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];
