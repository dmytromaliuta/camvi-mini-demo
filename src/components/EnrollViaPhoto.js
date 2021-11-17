import React from 'react';
import Dropzone from 'react-dropzone';
import { NavLink } from 'react-router-dom';
import '../css/main.css';
import close from '../img/close.png';

function EnrollViaPhoto() {

    const [imgSrc, setImgSrc] = React.useState(null);
    const [imgName, setImgName] = React.useState(null);

    const getBase64 = file => {
        return new Promise(resolve => {
            let baseURL = "";
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };

    const handleUpload = (file) => {
        setImgName('File name: ' + file[0].name)
        getBase64(file[0])
            .then(result => {
                setImgSrc(result)
            })
            .catch(err => {
                console.log('Error: ' + err);
            });
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
                <div className="capture_btn capture_photo_btn">
                    Submit
                </div>
            </div>
        </div>
    )
}


export default EnrollViaPhoto