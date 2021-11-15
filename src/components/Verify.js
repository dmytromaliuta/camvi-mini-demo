import React from 'react';
import '../css/main.css';

function Verify() {
    return (
        <div className="verify">
            <div className="form_content">
                <div className="form_div">
                    <form>
                        <label>
                            <span>API Key</span>
                            <input type="text" disabled />
                        </label>
                        <label>
                            <span>CUC Key</span>
                            <input type="text" />
                        </label>
                        <label>
                            <span>Person Label</span>
                            <select placeholder="">
                                <option value="">Choose person</option>
                                <option>Person_Label</option>
                                <option>Person_Label</option>
                                <option>Person_Label</option>
                                <option>Person_Label</option>
                                <option>Person_Label</option>
                                <option>Person_Label</option>
                                <option>Person_Label</option>
                                <option>Person_Label</option>
                                <option>Person_Label</option>
                            </select>
                        </label>
                        <label>
                            <span>Liveness</span>
                            <input type="checkbox" />
                        </label>
                    </form>
                </div>
                <div className="btn verify_btn">
                    Next
                </div>
            </div>
        </div>
    )
}

export default Verify