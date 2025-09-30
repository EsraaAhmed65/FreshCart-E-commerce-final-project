"use client";
import Image from "next/image";
import React from "react";
import image from "./../../public/assets/404.jpg";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className='flex items-center justify-center h-[90vh]'>
      <div className='w-full lg:w-[90%] mx-auto p-4 flex flex-col items-center gap-8'>
        <h1 className='text-gray-600'>
          The requested content could not be found!
        </h1>
        <Image
          src={image}
          alt='404 Route Not Found!'
          width={800}
          className=''
        />
        <Link
          href='/'
          className='bg-gray-100 hover:bg-gray-200 p-4 rounded-md text-gray-600'
        >
          <i className='fas fa-up-long -rotate-45'></i> Home
        </Link>
      </div>
    </div>
  );
}