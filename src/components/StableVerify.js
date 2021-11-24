import React, { useEffect, useRef, useCallback } from 'react';
import '../css/main.css';
import Webcam from "react-webcam";
import close from '../img/close.png'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function StableVerify(props) {
    
    const navigate = useNavigate()
    useEffect(() => {
        if(props.personalLabel === undefined) {
            navigate('/verify')
        }
    });
    const {handleVerifyImage} = props;
    const webcamRef = useRef(null);
    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            handleVerifyImage(imageSrc)
        },
        [webcamRef, handleVerifyImage]
    );
    const handleImage = () => {
        setTimeout(capture, 3000)
    }
    return (
        <div className="stableVerify" style={props.loading ? {visibility: 'hidden'} : {visibility: 'visible'} }>
            <div className="stableVerifyContent">
                <NavLink to="/verify" className="btn_close">
                    <img src={close} alt="icon" />
                </NavLink>
                <div className="webcam-wrapper">
                    <Webcam
                        className="camera"
                        mirrored={true}
                        height={420}
                        width={420}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        onUserMedia={handleImage}/>
                </div>
                <div className="personName">
                    {props.personalLabel}
                </div>
            </div>
        </div>
    )
}

export default StableVerify