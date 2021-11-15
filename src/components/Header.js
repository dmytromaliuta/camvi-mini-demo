import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/main.css';
import logo from '../img/logo.png';

function Header() {
    return (
        <div className="header">
            <NavLink to="/">
                <div className="image">
                    <img alt="" src={logo} />
                </div>
            </NavLink>
        </div>
    )
}

export default Header