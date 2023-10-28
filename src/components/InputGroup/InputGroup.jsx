import React from 'react';
import './InputGroup.css';

const InputGroup = (props) => {
    if (props.type === 'checkbox') {
        return (
            <div>
                <div className="input-checkbox">
                    <input
                        type="checkbox"
                        id={props.id}
                        name={props.name}
                        onClick={props.onClick}
                        onChange={props.onChange}
                    />
                    <span></span>
                    <label htmlFor={props.id}>{props.labelInput}</label>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div className="group-input">
                    <input
                        type={props.type}
                        id={props.id}
                        name={props.name}
                        className={props.className}
                        value={props.value}
                        placeholder={props.placeholder}
                        onChange={props.onChange}
                    />
                    <span></span>
                    <label htmlFor={props.id}>
                        {props.labelInput ? props.labelInput : ''}
                    </label>
                </div>
            </>
        );
    }
};
export default InputGroup;
