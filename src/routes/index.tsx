// src/routes/index.tsx
import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import Home from '../pages/Home';
import Pokemon from '../pages/Pokemon';
import NotFound from '../pages/NotFound';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/pokemon/:id',
    element: <Pokemon />, 
  },
  {
    path: '*', // Catch-all for 404
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

export default router;