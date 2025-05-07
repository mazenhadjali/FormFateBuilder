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



const router = createBrowserRouter([
  {
    path: "/", element: <Dashboard />, children: [
      { path: "/", Component: Builder },
      { path: "/renderer", Component: Renderer },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/account",
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
