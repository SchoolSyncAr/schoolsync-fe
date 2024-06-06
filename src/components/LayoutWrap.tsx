import { Outlet } from 'react-router-dom'
import { Header } from 'components/Header/Header'
import { Footer } from 'components/Footer/Footer'

export const Page = () => {
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

Page.propTypes = {}
