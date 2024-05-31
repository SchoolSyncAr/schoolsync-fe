import './Footer.css'

function Footer() {
  return (
    <>
      <footer className='footer'>
        <div className='left-section'>
          <span className='objects separate'>SchoolSyncAr 2024 All Rights Reserved</span>
        </div>     
        <div className='center-section'>
          <i className="fab fa-facebook-square facebook_icon separate"></i>
          <i className='fab fa-whatsapp separate'></i>
          <i className='fab fa-twitter-square separate'></i>
        </div>
        <div className='right-section'>
          <span className='objects separate'>schoolsyncar@schoolsyncar.com.ar</span>
          <span className='objects separate'>contacto 4444-9999</span>
        </div>
      </footer>
    </>
  )
}

export default Footer