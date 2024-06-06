import { Link } from 'react-router-dom'
import './Logo.scss'

interface LogoProps {
  imgUrl: string
  alt: string
}

export const Logo = ({ ...props }: LogoProps) => {
  return (
    //Cambiar el Link "to" cuando este la homepage definida 
    <Link to="/NotificationsDashboard" className='logo'>
      <img src={props.imgUrl} alt={props.alt} />
      <div className='logo__text'>
        <h2 className="logo__brand">
            School<span className="logo__brand--lt">SyncAr</span>
        </h2>
      </div>
    </Link>
  )
}