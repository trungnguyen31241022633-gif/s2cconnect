/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedLayout from './components/layout/ProtectedLayout';
import Welcome from './pages/Welcome';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Explore from './pages/Explore';
import CreateMatch from './pages/CreateMatch';
import MyMatches from './pages/MyMatches';
import Profile from './pages/Profile';
import MatchDetails from './pages/MatchDetails';
import Chat from './pages/Chat';
import Review from './pages/Review';
import { Toaster } from './components/ui/sonner';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Outlet />
        <Toaster position="top-center" richColors />
      </>
    ),
    children: [
      { path: 'welcome', element: <Welcome /> },
      { path: 'onboarding', element: <Onboarding /> },
      {
        path: '/',
        element: <ProtectedLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: 'explore', element: <Explore /> },
          { path: 'create', element: <CreateMatch /> },
          { path: 'my-matches', element: <MyMatches /> },
          { path: 'profile', element: <Profile /> },
          { path: 'match/:id', element: <MatchDetails /> },
          { path: 'chat/:id', element: <Chat /> },
          { path: 'review/:id', element: <Review /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
