import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { RootLayout } from './routes/RootLayout'
import { Home } from './routes/Home'
import { ViewDoc } from './routes/ViewDoc'

const container = document.getElementById('root')
if (!container) {
	throw new Error('Root element not found')
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'docs/view/:token', element: <ViewDoc /> },
    ],
  },
])

const root = createRoot(container)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
