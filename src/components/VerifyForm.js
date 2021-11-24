import React, { useState, useEffect } from 'react';
import '../css/main.css';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { my_api_key, cucKey, gallery_label } from '../credentials'


function VerifyForm(props) {

    const [options, setOptions] = useState([])
    const [isCucKey, setCucKey] = useState(false);
    const [isPersonalLabel, setPersonalLabel] = useState(false);
    const [isSelectActive, setSelect] = useState(false);
    const [data, setData] = useState({
        apiKey: my_api_key,
        cucKey: cucKey,
        personalLabel: 'Choose person',
        personalID: '',
        liveness: false
    })

    useEffect(() => {
        const formData  = new FormData();
        formData.append('gallery_label', gallery_label);
        fetch(`/api/gallery/listPersons?cuc_key=${data.cucKey}`, {
            method: 'POST',
            body: formData,
            headers: {
                'authorization': my_api_key
            }
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        setOptions(data.person_list)
                    })
                    .catch(() => {
                        setOptions([])
                    })
            })
    }, [data.cucKey]);

    const handleEnroll = () => {
        if(!data.cucKey.trim().length) {
            setCucKey(true)
        } else {
            setCucKey(false)
        }
        if(data.personalLabel === 'Choose person') {
            setPersonalLabel(true)
        } else {
            setPersonalLabel(false)
        }
        if(data.cucKey !== '' && data.personalLabel !== 'Choose person') {
            props.handleVerifyData(data)
        }
    }

    return (
        <div className="form_content">
            <div className="form_div">
                <form>
                    <label>
                        <span>API Key</span>
                        <input disabled type="text" value={data.apiKey} onChange={(e) => {
                            setData({...data, apiKey: e.target.value})
                        }}/>
                    </label>
                    <label>
                        <span className="required">CUC Key</span>
                        <input className={isCucKey ? 'non-filled-input' : ''} type="text" value={data.cucKey} onChange={(e) => {
                            setData({...data, cucKey: e.target.value})
                        }}/>
                    </label>
                    <label className="customSelectLabel">
                        <span className="required">Person Label</span>
                        <div className={isPersonalLabel ? 'customSelect unselectable non-filled-input' : 'customSelect unselectable'} style={{color: data.personalLabel !== 'Choose person' ? '#000': '#ccc'}} onClick={() => {
                            setSelect(!isSelectActive)
                        }}>{data.personalLabel}</div>
                        <ul className="selectItemList" style={{visibility: isSelectActive ? 'visible': 'hidden'}}>
                            {
                                options.map((item, index) => {
                                    return <li key={index} onClick={(item) => {
                                        setSelect(!isSelectActive)
                                        setData({
                                            ...data,
                                            personalID: options[index].person_id,
                                            personalLabel: options[index].person_label
                                        })
                                    }} >{item.person_label}</li>
                                })
                            }
                        </ul>
                        <FontAwesomeIcon icon={faChevronDown} className="arrowSelect" />
                    </label>
                    <label>
                        <span>Liveness</span>
                        <div className="radioBlock">
                            <div className={data.liveness ? 'radio-wrapper active' : 'radio-wrapper'}>
                                <div className={data.liveness ? 'radio-circle active' : 'radio-circle'}></div>
                            </div>
                            <input type="checkbox" className="liveness" value={data.liveness} onChange={(e) => {
                            setData({...data, liveness: !data.liveness})
                        }}/>
                        </div>
                    </label>
                    <p className="hint"><span>*</span> - required field</p>
                </form>
            </div>
            <div className="btns">
                <div className="btn verify_btn" onClick={() => handleEnroll()}>
                    Next
                </div>
            </div>
        </div>
    )
}

export default VerifyForm