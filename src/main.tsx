import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { ApolloProvider } from '@apollo/client'
import client from './apolloClient.ts'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  
    
    <ApolloProvider client={client}>
    <RouterProvider router={router} />
  
    </ApolloProvider>

)
