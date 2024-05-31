import { Outlet } from 'react-router-dom'
import Header from 'components/Header'
import Footer from 'components/Footer'

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
