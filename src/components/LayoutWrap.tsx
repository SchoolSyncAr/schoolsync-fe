import { Outlet } from 'react-router-dom'
import { Header } from 'components/Header/Header'
import { Footer } from 'components/Footer/Footer'
import { SnackbarProvider } from 'notistack'

export const LayoutWrap = () => {
  return (
    <main className='main'>
      <Header />
      <SnackbarProvider
        className="snackbar"
        variant="error"
        autoHideDuration={4000}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      />
      <div className='main__content'>
        <Outlet />
      </div>
      <Footer />
    </main>
  )
}

LayoutWrap.propTypes = {}
