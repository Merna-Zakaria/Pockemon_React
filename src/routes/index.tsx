// src/routes/index.tsx
import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import Home from '../pages/Home';
// import About from '../pages/About';
import NotFound from '../pages/NotFound';
// import DashboardLayout from '../layouts/DashboardLayout'; // Example layout
// import DashboardHome from '../pages/DashboardHome';
// import DashboardSettings from '../pages/DashboardSettings';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
//   {
//     path: '/dashboard',
//     element: <DashboardLayout />, // Use a layout component
//     children: [
//       {
//         index: true, // Matches /dashboard
//         element: <DashboardHome />,
//       },
//       {
//         path: 'settings', // Matches /dashboard/settings
//         element: <DashboardSettings />,
//       },
//     ],
//   },
  {
    path: '*', // Catch-all for 404
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

export default router;