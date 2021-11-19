import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { my_api_key } from '../credentials';
import '../css/main.css';


function EnrollForm(props) {

    const navigate = useNavigate()

    const [isApiKey, setApiKey] = useState(false);
    const [isCucKey, setCucKey] = useState(false);
    const [isPersonalLabel, setPersonalLabel] = useState(false);
    const[enrollData, setData] = useState({
        apiKey: my_api_key,
        cucKey: '',
        personalLabel: ''
    })

    const handleEnroll = (type) => {
        
        if(!enrollData.apiKey.trim().length) {
            setApiKey(true)
        } else {
            setApiKey(false)
        }
        if(!enrollData.cucKey.trim().length) {
            setCucKey(true)
        } else {
            setCucKey(false)
        }
        if(!enrollData.personalLabel.trim().length) {
            setPersonalLabel(true)
        } else {
            setPersonalLabel(false)
        }
        if(enrollData.apiKey !== '' && enrollData.cucKey !== '' && enrollData.personalLabel !== '') {
            if(type === 'camera') {
                props.handleData(enrollData)
                navigate('captureCamera')
            }
            if(type === 'photo') {
                props.handleData(enrollData)
                navigate('capturePhoto')
            }
        }
    }

    return (
        <div className="form_content">
            <div className="form_div">
                <form>
                    <label>
                        <span className="required">API Key</span>
                        <input className={isApiKey ? 'non-filled-input' : ''} type="text" value={enrollData.apiKey} disabled onChange={(e) => {
                            setData({...enrollData, apiKey: e.target.value})
                        }}/>
                    </label>
                    <label>
                        <span className="required">CUC Key</span>
                        <input className={isCucKey ? 'non-filled-input' : ''} type="text" value={enrollData.cucKey} onChange={(e) => {
                            setData({...enrollData, cucKey: e.target.value})
                        }}/>
                    </label>
                    <label>
                        <span className="required">Person label</span>
                        <input className={isPersonalLabel ? 'non-filled-input' : ''} type="text" value={enrollData.personalLabel} onChange={(e) => {
                            setData({...enrollData, personalLabel: e.target.value})
                        }}/>
                    </label>
                    <p className="hint"><span>*</span> - required field</p>
                </form>
            </div>
            <div className="btns">
                <div className="btn verify_btn" onClick={() => {handleEnroll('camera')}}>
                    Enroll <br/> (via Camera)
                </div>
                <div className="btn verify_btn" onClick={() => {handleEnroll('photo')}}>
                    Enroll <br/> (via Photo)
                </div>
            </div>
        </div>
    )
}

export default EnrollForm