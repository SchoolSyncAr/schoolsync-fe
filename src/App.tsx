import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import { routerConfig } from './routes'

function App() {
  const router = createBrowserRouter(routerConfig)
  return (
    <>
      <div>
        <Header></Header>
        <RouterProvider router={router} />
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
