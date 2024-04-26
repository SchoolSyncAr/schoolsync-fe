import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export const LayoutWrap = () => {
  return (
    <>
      <Header />
      {/* centrar router */}
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

LayoutWrap.propTypes = {}
