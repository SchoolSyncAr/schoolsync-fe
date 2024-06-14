import { IconButton } from '@mui/material'
import { Facebook, WhatsApp, Twitter, Instagram } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import './Footer.css'

export const Footer = () => {

  const textClass = 'text text--xs text--white text--light'
  const iconClass = 'icon'

  return (
    <footer className='main__footer'>
      <span className={textClass}>SchoolSyncAr 2024 All Rights Reserved</span>  
      <div className='links'>
        <Link to="https://www.facebook.com/paginaoficial" target="_blank">
          <IconButton>
            <Facebook className={iconClass} />
          </IconButton>
        </Link>
        <Link to="https://wa.me/numero_de_telefono " target="_blank">
          <IconButton>
            <WhatsApp className={iconClass} />
          </IconButton>
        </Link>
        <Link to="https://twitter.com/paginaoficial" target="_blank">
          <IconButton>
            <Twitter className={iconClass} />
          </IconButton>
        </Link>
        <Link to="https://www.instagram.com" target="_blank">
          <IconButton>
            <Instagram className={iconClass} />
          </IconButton>
        </Link>
      </div>
      <span className={textClass}>schoolsyncar@schoolsyncar.com.ar</span>
    </footer>
  )
}
