import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";


const ButtonCart = (props) => {

    return (
        <div className='button_cart'>
            <button onClick={props.onClick}>{props.title} <FontAwesomeIcon icon={faArrowRightLong} size="lg"/></button>
        </div>
    )
}

export default ButtonCart;
