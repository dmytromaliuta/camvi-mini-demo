import React, { useEffect, useRef, useCallback, useState } from 'react';
import '../css/main.css';
import Webcam from "react-webcam";
import close from '../img/close.png'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { leftMax, leftMin, rightMax, rightMin, upMax, upMin, downMin, downMax } from '../config.js'

function LivenessVerify(props) {

    const navigate = useNavigate()
    const webcamRef = useRef(null);
    const [hints] = useState([
        {
            hint: "Turn face 45 degrees to the left",
            value: "fl"
        },
        {
            hint: "Turn face 45 degrees to the right",
            value: "fr"
        },
        {
            hint: "Turn face 45 degrees up",
            value: "fu"
        },
        {
            hint: "Turn face 45 degrees down",
            value: "fd"
        },
        {
            hint: "Close left eye",
            value: "el"
        },
        {
            hint: "Close right eye",
            value: "er"
        }
    ].sort(() => Math.random() - 0.5).slice(0, 2))
    const [attempt, setAttempt] = useState(1)
    const [faceDetected, setFaceDetected] = useState(false)
    const [firstErrorDetected, setFirstErrorDetected] = useState(false)
    const [secondErrorDetected, setSecondErrorDetected] = useState(false)
    const [checkHint, setHintStatus] = useState(true)
    const [imageSrc, setImageSrc] = useState(null)


    const [errorMessage, setErrorMessage] = useState("Please, follow the prompts")


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

    const capture = () => {
        let imageSrc = null
        while(imageSrc === null) {
            imageSrc = makeScreenshot();
        }
        if(!imageSrc) return
        setImageSrc(imageSrc)
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
                        console.log(data)
                        if(data.error === 'No face detected') {
                            setTimeout(() => {
                                capture()
                            }, 100)
                            setErrorMessage(data.error)
                        } else {
                            setErrorMessage('Please, follow the prompts')
                        }
                        if(hints[attempt - 1].value === 'fl') {
                            if (data.face_count_input === 1 && data.faces[0].yaw < leftMax && data.faces[0].yaw > leftMin) {
                                //setHintStatus(true)
                                setAttempt(2)
                                if(attempt === 2) setFaceDetected(true)
                            } else {
                                //setHintStatus(false)
                                setTimeout(() => {
                                    capture()
                                }, 100)
                            }
                        }
                        if(hints[attempt - 1].value === 'fr') {
                            if (data.face_count_input === 1 && data.faces[0].yaw > rightMin && data.faces[0].yaw < rightMax) {
                                //setHintStatus(true)
                                setAttempt(2)
                                if(attempt === 2) setFaceDetected(true)
                            } else {
                                //setHintStatus(false)
                                setTimeout(() => {
                                    capture()
                                }, 100)
                            }
                        }
                        if(hints[attempt - 1].value === 'fu') {
                            if (data.face_count_input === 1 && data.faces[0].pitch < upMax && data.faces[0].pitch > upMin) {
                                //setHintStatus(true)
                                setAttempt(2)
                                if(attempt === 2) setFaceDetected(true)
                            } else {
                                //setHintStatus(false)
                                setTimeout(() => {
                                    capture()
                                }, 100)
                            }
                        }
                        if(hints[attempt - 1].value === 'fd') {
                            if (data.face_count_input === 1 && data.faces[0].pitch > downMin && data.faces[0].pitch < downMax) {
                                //setHintStatus(true)
                                setAttempt(2)
                                if(attempt === 2) setFaceDetected(true)
                            } else {
                                //setHintStatus(false)
                                setTimeout(() => {
                                    capture()
                                }, 100)
                            }
                        }
                        if(hints[attempt - 1].value === 'el') {
                            
                            if (data.face_count_input === 1 && data.faces[0].eye1_open - data.faces[0].eye2_open  < -0.07) {
                                //setHintStatus(true)
                                setAttempt(2)
                                if(attempt === 2) setFaceDetected(true)
                            } else {
                                //setHintStatus(false)
                                setTimeout(() => {
                                    capture()
                                }, 100)
                            }
                        }
                        if(hints[attempt - 1].value === 'er') {
                            
                            if (data.face_count_input === 1 && data.faces[0].eye2_open - data.faces[0].eye1_open < -0.07) {
                                //setHintStatus(true)
                                setAttempt(2)
                                if(attempt === 2) setFaceDetected(true)
                            } else {
                                //setHintStatus(false)
                                setTimeout(() => {
                                    capture()
                                }, 100)
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
            capture()
            setTimeout(() => {
                setFirstErrorDetected(true)
            }, 5000)
        }, 100)
    }

    const makeScreenshot = useCallback(
        () => {
            if(webcamRef.current === null) {
                return false
            }
            return webcamRef.current.getScreenshot();
        },
        [webcamRef]
    );

    useEffect(() => {
        if(firstErrorDetected && attempt === 1) {
            setFirstErrorDetected(false)
            props.setVerifyStatus({
                message: errorMessage,
                status: 2
            })
            navigate('/verify/status')
        }
        if(secondErrorDetected && attempt === 2 && !faceDetected) {
            setSecondErrorDetected(false)
            props.setVerifyStatus({
                message: errorMessage,
                status: 2
            })
            navigate('/verify/status')
        }
        if (props.personalLabel === undefined) {
            navigate('/verify')
        }
        if (attempt === 2 && !faceDetected) {
            setTimeout(capture, 100)
            setTimeout(() => {
                setSecondErrorDetected(true)
            }, 5000)
            return
        }
        if (attempt === 2 && faceDetected && firstErrorDetected && secondErrorDetected) {
            //setHintStatus(true)
            props.setLoading(true)
            props.handleVerifyImage(imageSrc)
        }
    }, [attempt, faceDetected, firstErrorDetected, secondErrorDetected]);

    return (
        <div className="stableVerify livenessVerify" style={props.loading ? { visibility: 'hidden' } : { visibility: 'visible' }}>
            <div className="stableVerifyContent livenessVerifyContent">
                <NavLink to="/verify" className="btn_close">
                    <img src={close} alt="icon" />
                </NavLink>
                <div className="hintIndex">
                    <span style={checkHint ? { color: 'white' } : { color: '#FF0000' }}>{attempt}</span>/2
                </div>
                <div className="hint" style={checkHint ? { border: 'none' } : { border: '5px solid #FF0000' }}>
                    {hints[attempt - 1].hint}
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