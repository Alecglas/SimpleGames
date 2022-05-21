import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';

export default function Navbar() {
  return (
    <div className="navbar">
        <NavLink className="navbarLink" to="/" end>Home</NavLink>
        <NavLink className="navbarLink" to="/qwixx">Qwixx</NavLink>
    </div>
  );
}