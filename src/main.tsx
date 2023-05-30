import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import ErrorBoundary from './components/ErrorBoundary.tsx'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './components/ErrorFallback.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()} >
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
