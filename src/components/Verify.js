import React, { useState } from 'react';
import '../css/main.css';
import VerifyForm from './VerifyForm';
import LivenessVerify from './LivenessVerify';
import StableVerify from './StableVerify';
import Status from './Status'
import { Route, Routes } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Loader from "react-loader-spinner";
import { similarityСoefficient } from '../config.js'


function Verify() {

    const [verifyData, setVerifyData] = useState({})
    const [verifyStatus, setVerifyStatus] = useState({})
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    
    const handleVerifyData = (data) => {
        setVerifyData(data)
        if(data.liveness) navigate('/verify/liveness')
        else navigate('/verify/stable')
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
    const handleVerifyImage = (image) => {
        const formData  = new FormData();
        formData.append('person_id', verifyData.personalID);
        formData.append('image', dataURLtoFile(image));
        setLoading(true)
        fetch(`/api/person/verify?cuc_key=${verifyData.cucKey}`, {
            method: 'POST',
            body: formData,
            headers: {
                'authorization': verifyData.apiKey
            }
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        setLoading(false)
                        if(data.match_score_avg > similarityСoefficient) {
                            setVerifyStatus({
                                message: 'Verification successful',
                                status: 1
                            })
                        } else {
                            setVerifyStatus({
                                message: 'Verification failed',
                                status: 0
                            })
                        }
                        navigate('/verify/status')
                    })
                    .catch(() => {
                        setLoading(false)
                        setVerifyStatus({
                            message: 'Verification failed',
                            status: 0
                        })
                        navigate('/verify/status')
                    })
            })
    }

    return (
        <div className="verify">
            <Loader
                visible={loading}
                className="loader"
                type="TailSpin"
                color="#faa634"
                height={50}
                width={50}
            />
            <Routes>
                <Route path="/" element={<VerifyForm handleVerifyData={handleVerifyData} />} />
                <Route path="/stable" element={<StableVerify loading={loading} personalLabel={verifyData.personalLabel} handleVerifyImage={handleVerifyImage} />} />
                <Route path="/liveness" element={<LivenessVerify loading={loading} handleVerifyImage={handleVerifyImage} personalLabel={verifyData.personalLabel} cucKey={verifyData.cucKey} apiKey={verifyData.apiKey} setLoading={setLoading} setVerifyStatus={setVerifyStatus} />} />
                <Route path="/status" element={<Status status={verifyStatus} content="/verify" />} />
            </Routes>
        </div>
    )
}

export default Verify