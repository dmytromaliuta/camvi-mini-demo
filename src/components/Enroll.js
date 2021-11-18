import React, { useState } from 'react';
import { Route, Routes } from 'react-router';
import '../css/main.css';
import EnrollForm from './EnrollForm'
import EnrollViaCamera from './EnrollViaCamera'
import EnrollViaPhoto from './EnrollViaPhoto'
import { gallery_label } from '../credentials'


function Enroll() {

    const [enrollData, setData] = useState(null)

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
                    .then((data) => console.log(data))
                    .catch((e) => console.log('ERROR'))
            })
            .catch((e) => console.log('ERROR'));
    }
    return (
        <div className="enroll">
            <Routes>
                <Route path="/" element={<EnrollForm handleData={handleData} />} />
                <Route path="/captureCamera" element={<EnrollViaCamera enrollPerson={enrollPerson} enrollData={enrollData} />} />
                <Route path="/capturePhoto" element={<EnrollViaPhoto enrollPerson={enrollPerson} enrollData={enrollData} />} />
            </Routes>
        </div>
        
    )
}

export default Enroll