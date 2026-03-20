import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// React Hot Toast:
import { Toaster } from 'react-hot-toast'
// React Router DOM:
import { BrowserRouter } from 'react-router-dom'
// Contexts:
import AppProviders from '@contexts/AppProviders'
// Tanstack Query:
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppProviders>
          <App />
        </AppProviders>
      </QueryClientProvider>
    </BrowserRouter>
    {/* React Hot Toast */}
    <Toaster />
  </StrictMode>,
)
