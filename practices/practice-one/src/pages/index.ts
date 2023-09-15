import { lazy } from 'react';

const DetailPage = lazy(() => import('./Detail'));
const HomePage = lazy(() => import('./Home'));
const NotFoundPage = lazy(() => import('./NotFound'));

export { DetailPage, HomePage, NotFoundPage };
