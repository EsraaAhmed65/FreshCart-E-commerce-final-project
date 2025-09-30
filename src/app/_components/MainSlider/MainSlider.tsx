"use client"
import React from 'react'
import banner1 from './../../../../public/assets/slider/grocery-banner-2.jpeg'
import banner2 from './../../../../public/assets/slider/grocery-banner.png'

import slide1 from './../../../../public/assets/slider/slider-image-1.jpeg'
import slide2 from './../../../../public/assets/slider/slider-image-2.jpeg'
import slide3 from './../../../../public/assets/slider/slider-image-3.jpeg'
import Image from 'next/image'
import "swiper/css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";



const MainSlider = () => {
    return (
         <div className="mb-10 grid grid-cols-3 gap-0">
      <div className="col-span-2">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 2000 }}
          modules={[Autoplay]}
          className="w-full h-[400px]"
        >
                     <SwiperSlide>
            <Image className="w-full h-[400px] object-cover" src={slide1} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <Image className="w-full h-[400px] object-cover" src={slide2} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <Image className="w-full h-[400px] object-cover" src={slide3} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="flex flex-col h-[400px]">
        <Image className="w-full h-1/2 object-cover" src={banner1} alt="" />
        <Image className="w-full h-1/2 object-cover" src={banner2} alt="" />
      </div>
    </div>
  );
};


export default MainSlider


