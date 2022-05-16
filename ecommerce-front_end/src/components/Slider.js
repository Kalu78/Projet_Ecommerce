import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Slider = (props) => {

    return (
        <Swiper
            className='slider'
            spaceBetween={50}
            slidesPerView={4}
            onSlideChange={() => console.log('slide change')}
        >
        <>
        {props.products &&
            props.products.map((product) => (   
            <SwiperSlide key={props.id}>{props.product.name}</SwiperSlide>
        ))}
        </>
        </Swiper>
    )
}

export default Slider;
