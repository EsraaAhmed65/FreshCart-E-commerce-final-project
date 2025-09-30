import getAllCategories from '@/APIs/allCategories'
import React from 'react'
import Categories from './../../categories/page';
import SwiperCategory from '../SwiperCategory/SwiperCategory';
import { Category } from '@/types/product.t';

const CategorySlide = async () => {
    const data: Category[] = await getAllCategories()
  return (
    <div className='mb-3'>
        <SwiperCategory categories = {data}/>
    </div>
  )
}

export default CategorySlide