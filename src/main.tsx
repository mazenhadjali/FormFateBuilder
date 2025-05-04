import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Builder from './pages/Builder.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Renderer from './pages/Renderer.tsx';
import Dashboard from './pages/Dashboard.tsx';



const router = createBrowserRouter([
  {
    path: "/", element: <Dashboard />, children: [
      { path: "/", Component: Builder },
      { path: "/renderer", Component: Renderer },
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
