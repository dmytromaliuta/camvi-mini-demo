import React, { useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/main.css';
import close from '../img/close.png';

function EnrollViaPhoto(props) {

    const navigate = useNavigate()

    useEffect(() => {
        if(props.enrollData === null) {
            navigate('/enroll')
        }
    });

    const [imgSrc, setImgSrc] = React.useState(null);
    const [imgName, setImgName] = React.useState(null);

    const handleUpload = (file) => {
        setImgName('File name: ' + file[0].name)
        setImgSrc(file[0])
    }

    return (
        <div className="enrollPhotoWrapper">
            <div className="enrollCamera enrollPhoto">
                <NavLink to="/enroll" className="btn_close">
                    <img src={close} alt="icon" />
                </NavLink>
                <div className="dropBlock">
                    <Dropzone multiple={false} onDrop={acceptedFile => handleUpload(acceptedFile)}>
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p className="dropdawn-hint">Drop file here or</p>
                                    <p className="dropdawn-btn">Browse files</p>
                                    <span className="uploadedImageName">{imgName}</span>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
                <div className="capture_btn capture_photo_btn" onClick={() => {props.enrollPerson(imgSrc, 'photo')}}>
                    Submit
                </div>
            </div>
        </div>
    )
}


export default EnrollViaPhoto