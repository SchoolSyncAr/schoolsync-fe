// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.css'
import { NotificationProvider } from 'components/hooks/NotificationContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <NotificationProvider>
    <App />
  </NotificationProvider>,
  //</React.StrictMode>
)
