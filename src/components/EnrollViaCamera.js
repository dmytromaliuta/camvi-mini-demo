import React, { useRef, useCallback, useEffect } from 'react';
import '../css/main.css';
import Webcam from "react-webcam";
import close from '../img/close.png'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EnrollViaCamera(props) {

    const {enrollPerson} = props;
    const navigate = useNavigate()

    useEffect(() => {
        if(props.enrollData === null) {
            navigate('/enroll')
        }
    });

    const webcamRef = useRef(null);
    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            enrollPerson(imageSrc, 'camera');
        },
        [webcamRef, enrollPerson]
    );

    return (
        <div className="enrollCameraWrapper">
            <div className="enrollCamera">
                <NavLink to="/enroll" className="btn_close">
                    <img src={close} alt="icon" />
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