import './Header.css'

function Header() {
  return ( 

    <nav className='nav'>
      <h2><a href="/parentDashboard" className='nav-title'>SchoolSyncAr</a></h2>
      <div className="nav-links">
        <a href="">Link 1</a>
        <a href="">Link 2</a>
        <a href="">Link 3</a>
        <a href="">Link 4</a>
        <a href="/notificationsDashboard" className="notification">
          <i className="fa fa-regular fa-bell" />
          <span className="notification__badge">2</span>
        </a>
      </div>
    </nav>
  )
}

export default Header