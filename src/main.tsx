import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Builder from './pages/Builder.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Renderer from './pages/Renderer.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Login from './pages/account/login.tsx';
import Signup from './pages/account/signUp.tsx';
import Profile from './pages/account/profile.tsx';
import { ACCOUNT, HOME, LOGIN, RENDERER, SIGNUP } from './routes.ts';



const router = createBrowserRouter([
  {
    path: HOME, element: <Dashboard />, children: [
      { path: HOME, Component: Builder },
      { path: RENDERER, Component: Renderer },
      {
        path: LOGIN,
        element: <Login />,
      },
      {
        path: SIGNUP,
        element: <Signup />,
      },
      {
        path: ACCOUNT,
        element: <Profile />,
      },
    ]
  },

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
