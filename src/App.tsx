import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './routes'
import { StyledEngineProvider } from '@mui/styled-engine'

function App() {
  const router = createBrowserRouter(routes)
  return (
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  )
}

export default App
