"use client"
import React from 'react'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import Image from 'next/image';
import Categories from './../../categories/page';
import { Category } from '@/types/product.t';

const SwiperCategory = ({ categories }:{categories: Category[]}) => {
    return (
        <div className="w-full">
            <Swiper
                modules={[Autoplay]}
                spaceBetween={0}              
                slidesPerView={6}             
                loop={true}                    
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                grabCursor
                className="w-full"
            >
                {categories.map((category, idx) => (
                    <SwiperSlide key={idx}>
                        <Image width={500} height={500}
                            src={category.image}
                            alt={category.name}
                            className="w-full h-[220px] object-cover"
                        />
                        <div className='absolute bottom-0 w-full bg-black/70 z-10 py-1'>
                            <p className='text-center text-white font-bold tracking-wide drop-shadow-md line-clamp-1'>
                                {category.name}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default SwiperCategory;
