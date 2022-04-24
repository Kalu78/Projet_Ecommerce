import React from 'react';
import Button from './Button';


const Banner = (props) => {

    return (
        <div className='banner'>
            <div className='banner_img'>
                <img src={props.image}>
                </img>
            </div>
            <div className='container'>
                <div className='banner_content'>
                    <div className='banner_title'><h2>{props.title}</h2></div>
                    <div className='banner_paragraphe'><p>{props.paragraphe}</p></div>
                    <div><Button class="banner_button" title="Acheter les produits"/></div>
                </div>
            </div>
        </div>
    )
}

export default Banner;
