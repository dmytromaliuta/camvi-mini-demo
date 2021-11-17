import React, { useRef, useCallback } from 'react';
import '../css/main.css';
import Webcam from "react-webcam";
import close from '../img/close.png'
import { NavLink } from 'react-router-dom';

function EnrollViaCamera() {

    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImgSrc(imageSrc);
        },
        [webcamRef]
    );

    return (
        <div className="enrollCameraWrapper">
            <div className="enrollCamera">
                <NavLink to="/enroll" className="btn_close">
                    <img src={close} />
                </NavLink>
                <div className="webcam">
                    <Webcam
                        className="camera"
                        mirrored={true}
                        height={420}
                        width={420}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg" />
                    <span>Camera</span>
                </div>
                <div className="capture_btn" onClick={capture}>
                    Capture
                </div>
            </div>
        </div>
    )
}

export default EnrollViaCamera