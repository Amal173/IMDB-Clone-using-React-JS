import React from 'react'
import './Footer.css'
function Footer() {
  return (
    <div className='footer'>
      <div className='socialMediaIcons'>
        <i className="fa-brands fa-facebook" ></i>
        <i class="fa-brands fa-instagram"></i>
        <i class="fa-brands fa-square-x-twitter"></i>
        <i class="fa-brands fa-youtube"></i>
        <i class="fa-brands fa-reddit-alien"></i>
      </div>
      <p className='brandLogo'>an amazon company</p>
      <p className='copyright'>© 1990-2023 by IMDb.com, Inc.</p>
    </div>
  )
}

export default Footer