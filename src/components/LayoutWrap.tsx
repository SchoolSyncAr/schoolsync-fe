import { Outlet } from 'react-router-dom'
import { Header } from 'components/Header/Header'
import { Footer } from 'components/Footer/Footer'

export const LayoutWrap = () => {
  return (
    <main className='main'>
      <Header />
      <div className='main__content'>
        <Outlet />
      </div>
      <Footer />
    </main>
  )
}

LayoutWrap.propTypes = {}
