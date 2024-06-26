// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import 'bootstrap/dist/css/bootstrap.css'
import { NotificationProvider } from 'components/hooks/NotificationContext.tsx'
import { StyledEngineProvider } from '@mui/styled-engine'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StyledEngineProvider injectFirst>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </StyledEngineProvider>,
)
