import { lazy } from 'react';

const ErrorFallback = lazy(() => import('./Error'));
const Heading = lazy(() => import('./Heading'));
const Toast = lazy(() => import('./Toast'));
const Card = lazy(() => import('./Card'));
const Cart = lazy(() => import('./Cart'));
const Filter = lazy(() => import('./Filter'));
const Grid = lazy(() => import('./Grid'));
const Loading = lazy(() => import('./Loading'));
const Select = lazy(() => import('./Select'));

export {
  ErrorFallback,
  Heading,
  Toast,
  Card,
  Cart,
  Filter,
  Grid,
  Loading,
  Select,
};
