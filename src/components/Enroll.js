import React from 'react';
import { Route, Routes } from 'react-router';
import '../css/main.css';
import EnrollForm from './EnrollForm'
import EnrollViaCamera from './EnrollViaCamera'
import EnrollViaPhoto from './EnrollViaPhoto'


function Enroll() {
    return (
        <div className="enroll">
            <Routes>
                <Route path="/" element={<EnrollForm />} />
                <Route path="/captureCamera" element={<EnrollViaCamera />} />
                <Route path="/capturePhoto" element={<EnrollViaPhoto />} />
            </Routes>
        </div>
    )
}

export default Enroll