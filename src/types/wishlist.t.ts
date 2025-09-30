export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
} 

export interface ProductType {
  sold: number | string;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}


export interface WishlistProduct {
  _id: string;            
  id?: string;            
  title: string;          
  price: number;
  imageCover: string;     
  description?: string;  
}


export interface WishlistResponse {
  status: string;
  count: number;
  data: WishlistProduct[];
}