import React from 'react';

function NavbarItem({ render, href, label }) {
  if (render) {
    return (
      
        <a className='nav-link' href={href}>
          {label}
        </a>
     
    );
  } else {
    return null;
  }
}

export default NavbarItem;
