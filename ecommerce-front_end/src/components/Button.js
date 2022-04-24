import React from 'react';

const Button = (props) => {

    return (
        <button  type={props.type} className={props.class} onClick={props.function}>
            {props.title}
        </button>
    )
}

export default Button;
