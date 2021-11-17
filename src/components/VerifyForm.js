import React, { useState } from 'react';
import '../css/main.css';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { my_api_key } from '../credentials'


function VerifyForm() {

    const options = [
        { person_id: 'test1', person_label: 'Test 1' },
        { person_id: 'test2', person_label: 'Test 2' },
        { person_id: 'test3', person_label: 'Test 3' },
        { person_id: 'test4', person_label: 'Test 4' },
        { person_id: 'test5', person_label: 'Test 5' },
        { person_id: 'test6', person_label: 'Test 6' },
        { person_id: 'test7', person_label: 'Test 7' },
        { person_id: 'test8', person_label: 'Test 8' },
        { person_id: 'test9', person_label: 'Test 9' },
        { person_id: 'test10', person_label: 'Test 10' },
        { person_id: 'test11', person_label: 'Test 11' },
        { person_id: 'test12', person_label: 'Test 12' },
        { person_id: 'test13', person_label: 'Test 13' },
    ]

    const [isCucKey, setCucKey] = useState(false);
    const [isPersonalLabel, setPersonalLabel] = useState(false);
    const [isSelectActive, setSelect] = useState(false);
    const [data, setData] = useState({
        apiKey: my_api_key,
        cucKey: '',
        personalLabel: 'Choose person',
        liveness: false
    })

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
        //console.log('click')
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
                                            personalLabel: item.target.innerText
                                        })
                                        console.log(item.target.innerText)
                                    }} >{item.person_id}</li>
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