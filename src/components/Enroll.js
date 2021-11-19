import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useNavigate } from 'react-router-dom';
import '../css/main.css';
import EnrollForm from './EnrollForm'
import EnrollViaCamera from './EnrollViaCamera'
import EnrollViaPhoto from './EnrollViaPhoto'
import Status from './Status'
import { gallery_label } from '../credentials'
import Loader from "react-loader-spinner";


function Enroll(props) {

    useEffect(() => {
        if(props === null) {
            navigate('/enroll')
        }
    });

    const navigate = useNavigate()

    const [enrollData, setData] = useState(null)
    const [enrollStatus, setEnrollStatus] = useState({})
    const [loading, setLoading] = useState(false)

    const handleData = (value) => {
        setData(value)
    }

    const dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    const enrollPerson = (imageData, type) => {
        if(imageData === null) return 
        setLoading(true)
        const URL = '/api/person/enroll?' + new URLSearchParams({
            cuc_key: enrollData.cucKey
        });
        let requestBody = {
            cuc_key: enrollData.cucKey,
            person_label: enrollData.personalLabel,
            gallery_label: gallery_label,
            image: type === 'camera' ? dataURLtoFile(imageData) : imageData
        }
        const formData  = new FormData();
        for(const name in requestBody) {
            formData.append(name, requestBody[name]);
        }
        fetch(URL, {
            method: 'POST',
            body: formData,
            headers: {
                'authorization': enrollData.apiKey
            }
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        console.log(data)
                        setLoading(false)
                        setEnrollStatus(data)
                        navigate('/enroll/status')

                    })
                    .catch(() => {
                        setLoading(false)
                        setEnrollStatus({
                            status: 'fail',
                            error: 'Enrolled failed'
                        })
                        navigate('/enroll/status')
                    })
            })
    }
    return (
        <div className="enroll">
            <Loader
                visible={loading}
                className="loader"
                type="TailSpin"
                color="#faa634"
                height={50}
                width={50}
            />
            <Routes>
                <Route path="/" element={<EnrollForm handleData={handleData} />} />
                <Route path="/captureCamera" element={<EnrollViaCamera loading={loading} enrollPerson={enrollPerson} enrollData={enrollData} />} />
                <Route path="/capturePhoto" element={<EnrollViaPhoto loading={loading} enrollPerson={enrollPerson} enrollData={enrollData} />} />
                <Route path="/status" element={<Status status={enrollStatus} />} />
            </Routes>
        </div>
        
    )
}

export default Enroll