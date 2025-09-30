import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import getAllProducts from "@/APIs/allProducts";
import HomeCard from "./_components/HomeCard/HomeCard";
import MainSlider from "./_components/MainSlider/MainSlider";
import CategorySlide from "./_components/CategorySlide/CategorySlide";
import { Product } from './../types/product.t';
import Footer from "./_components/Footer/Footer";
export default async function Home() {

  const data:Product[] = await getAllProducts()

  return (
    <section className="px-5 md:px-0 my-10 w-full md:w-[80%] mx-auto">
      <MainSlider />
      <CategorySlide />

      <div className="flex flex-wrap mt-10">
        {data.map((product:Product, idx: number) => (
          <HomeCard key={idx} product={product} />
        ))}
      </div>
    </section>
  );
}
