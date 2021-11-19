import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/main.css';
import close from '../img/close.png'


function Status(props) {

    const navigate = useNavigate()

    useEffect(() => {
        if(props.status.status === undefined) {
            navigate('/enroll')
        }
    });

    return (
        <div className="status">
            <div className="statusContent">
                <NavLink to="/enroll" className="btn_close">
                    <img src={close} alt="icon" />
                </NavLink>
                <p className="statusMessage">
                    {
                        props.status.status === 'fail' ? props.status.error : 'Person enrolled successfully'
                    }
                </p>
                <NavLink to=".." className="submitBtn">
                    Ok
                </NavLink>
            </div>
        </div>
    )
}

export default Status