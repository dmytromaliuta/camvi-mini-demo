import React, { useState } from 'react';
import '../css/main.css';

function EnrollForm() {

    const[enrollData, setData] = useState({
        apiKey: '',
        cucKey: '',
        person_label: ''
    })

    return (
        <div className="form_content">
            <div className="form_div">
                <form>
                    <label>
                        <span className="required">API Key</span>
                        <input type="text" value={enrollData.apiKey} onChange={(e) => {
                            setData({...enrollData, apiKey: e.target.value})
                        }}/>
                    </label>
                    <label>
                        <span className="required">CUC Key</span>
                        <input type="text" value={enrollData.cucKey} onChange={(e) => {
                            setData({...enrollData, cucKey: e.target.value})
                        }}/>
                    </label>
                    <label>
                        <span className="required">Person label</span>
                        <input type="text" value={enrollData.person_label} onChange={(e) => {
                            setData({...enrollData, person_label: e.target.value})
                        }}/>
                    </label>
                    <p className="hint"><span>*</span> - required field</p>
                </form>
            </div>
            <div className="btns">
                <div className="btn verify_btn">
                    Enroll <br/> (via Camera)
                </div>
                <div className="btn verify_btn">
                    Enroll <br/> (via Photo)
                </div>
            </div>
        </div>
    )
}

export default EnrollForm