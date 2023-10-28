import React from 'react';
import './Button.css';

const Button = (props) => {
    return (
        <>
            <button
                className={'btn ' + props.className}
                style={props.style}
                onClick={props.onClick}
            >
                {props.dataValue ? props.dataValue : ''}
            </button>
        </>
    );
};

export default Button;
