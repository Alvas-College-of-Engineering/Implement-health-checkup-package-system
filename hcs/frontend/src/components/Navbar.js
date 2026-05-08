import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand">
          ✚ Health Checkup System
        </NavLink>
        <div className="navbar-links">
          <NavLink to="/"         end className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>Home</NavLink>
          <NavLink to="/packages"     className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>Packages</NavLink>
          <NavLink to="/bookings"     className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>Bookings</NavLink>
        </div>
      </div>
    </nav>
  );
}
