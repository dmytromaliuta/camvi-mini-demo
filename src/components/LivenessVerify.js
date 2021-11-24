import React, { useEffect, useRef, useCallback, useState } from 'react';
import '../css/main.css';
import Webcam from "react-webcam";
import close from '../img/close.png'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { leftMax, leftMin, rightMax, rightMin } from '../config.js'

function LivenessVerify(props) {

    const navigate = useNavigate()
    const webcamRef = useRef(null);
    const [facePosition, setFacePosition] = useState({
        hint: 'Turn face 45 degrees to the left',
        hintIndex: 1
    })
    const [checkHint, setHintStatus] = useState(true)
    useEffect(() => {
        if (props.personalLabel === undefined) {
            navigate('/verify')
        }
    });

    const dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    const capture = (direction, mainPhoto) => {
        const imageSrc = makeScreenshot();
        const formData = new FormData();
        formData.append('image', dataURLtoFile(imageSrc));
        fetch(`/api/face/detect?cuc_key=${props.cucKey}`, {
            method: 'POST',
            body: formData,
            headers: {
                'authorization': props.apiKey
            }
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        if (direction === 'l') {
                            console.log(data.faces[0].yaw)
                            console.log(data.face_count_input)
                            if (data.face_count_input === 1 && data.faces[0].yaw < leftMax && data.faces[0].yaw > leftMin) {
                                setHintStatus(true)
                                setFacePosition({
                                    hint: 'Turn face 45 degrees to the right',
                                    hintIndex: 2
                                })
                                setTimeout(() => {
                                    capture('r')
                                }, 3000)
                            } else {
                                setHintStatus(false)
                                setTimeout(() => {
                                    capture('l')
                                }, 3000)
                            }
                        }
                        if (direction === 'r') {
                            console.log(data.faces[0].yaw)
                            console.log(data.face_count_input)
                            if (data.face_count_input === 1 && data.faces[0].yaw > rightMin && data.faces[0].yaw < rightMax) {
                                setHintStatus(true)
                                props.setLoading(true)
                                props.handleVerifyImage(imageSrc)
                            } else {
                                setHintStatus(false)
                                setTimeout(() => {
                                    capture('r')
                                }, 3000)
                            }
                        }
                    })
                    .catch((e) => {
                        props.setLoading(false)
                        props.setVerifyStatus({
                            message: 'Verification failed',
                            status: 0
                        })
                        navigate('/verify/status')
                    })
            })
    }
    const handleImage = () => {
        setTimeout(() => {
            capture('l', makeScreenshot())
        }, 3000)
    }
    const makeScreenshot = useCallback(
        () => {
            return webcamRef.current.getScreenshot();
        },
        [webcamRef]
    );
    return (
        <div className="stableVerify livenessVerify" style={props.loading ? { visibility: 'hidden' } : { visibility: 'visible' }}>
            <div className="stableVerifyContent livenessVerifyContent">
                <NavLink to="/verify" className="btn_close">
                    <img src={close} alt="icon" />
                </NavLink>
                <div className="hintIndex">
                    <span style={checkHint ? { color: 'white' } : { color: '#FF0000' }}>{facePosition.hintIndex}</span>/2
                </div>
                <div className="hint" style={checkHint ? { border: 'none' } : { border: '5px solid #FF0000' }}>
                    {facePosition.hint}
                </div>
                <div className="webcam-wrapper">
                    <Webcam
                        className="camera"
                        mirrored={true}
                        height={420}
                        width={420}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        onUserMedia={handleImage} />
                </div>
                <div className="personName">
                    {props.personalLabel}
                </div>
            </div>
        </div>
    )
}

export default LivenessVerify