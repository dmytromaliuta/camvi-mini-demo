import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/main.css';
import close from '../img/close.png'


function Status(props) {

    const navigate = useNavigate()

    useEffect(() => {
        if(props.status.message === undefined) {
            navigate(props.content)
        }
    });

    return (
        <div className="status">
            <div className="statusContent">
                <NavLink to={props.content} className="btn_close">
                    <img src={close} alt="icon" />
                </NavLink>
                <p className="statusMessage">
                    {
                        props.status.message
                    }
                </p>
                {
                    props.status.status === 0 && props.content === '/verify' &&
                    <span className="hint">
                        You may try again
                    </span>
                }
                <NavLink to={props.status.status === 2 ? '/verify/liveness' : ".."} className="submitBtn">
                    Ok
                </NavLink>
            </div>
        </div>
    )
}

export default Status