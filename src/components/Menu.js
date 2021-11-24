import React, { useState } from 'react';
import '../css/main.css';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom';

function Menu() {

    const [menu_btn, setActive] = useState(true);
    
    return (
        <div className="menu">
            <div>
                <span>
                    Demo
                </span>
                <FontAwesomeIcon icon={menu_btn ? faChevronUp : faChevronDown} className="arrow" onClick={() => {setActive(!menu_btn)}}/>
           </div>
           <nav className={menu_btn ? 'active' : ''}>
               <ul>
                   <li>
                       <NavLink to="/enroll">Enroll</NavLink>
                   </li>
                   <li>
                       <NavLink to="/verify">Verify</NavLink>
                   </li>
               </ul>
           </nav>
        </div>
    )
}

export default Menu