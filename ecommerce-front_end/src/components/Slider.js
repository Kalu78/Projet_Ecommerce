import React from 'react';
import Link from "next/link";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Slider = (props) => {


    return (
        <div className='slider'>
            <h2>{props.title}</h2>
            
            <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={20}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
            >
            
            {props.products &&
                props.products.map((product) => (  
                        <SwiperSlide>   
                            <Link href={`/product/${product.id}`}>
                            <img className='slide_image' src={product && product.attributes.image.data[0].attributes.url} />
                            </Link>
                            <p className='slide_name'>{product.attributes.name}</p>  
                        </SwiperSlide>
                  
            ))}
 
            
            </Swiper>
            
        </div>
        
    )
}

export default Slider;
