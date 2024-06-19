import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Página no encontrada</h1>
      <p>¡Ups! La página que estás buscando no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  )
}
