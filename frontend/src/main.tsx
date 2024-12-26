import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import DiscordClone from './app/page.tsx'
import WhiteboardPage from './app/whiteboard/page.tsx' 
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/discord",
    element:<DiscordClone/>
  },
  {
    path:"/whiteboard",
    element:<WhiteboardPage/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
