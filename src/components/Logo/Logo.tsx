import { Link } from 'react-router-dom'
import './Logo.scss'

interface LogoProps {
  imgUrl: string
  alt: string
  linkTo: string
}

export const Logo = ({ ...props }: LogoProps) => {
  return (
    <Link to={props.linkTo} className="logo">
      <img className="logo__img" src={props.imgUrl} alt={props.alt} />
      <div className="logo__text">
        <h2 className="logo__brand">
          School<span className="logo__brand--lt">SyncAr</span>
        </h2>
      </div>
    </Link>
  )
}
