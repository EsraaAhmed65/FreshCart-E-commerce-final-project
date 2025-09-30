"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { Brand } from "@/types/brand.t";
import { useRef } from "react";

export default function BrandCard({ brand }: { brand: Brand }) {
    const ref = useRef<HTMLDialogElement>(null);

    return (
        <>
            <div
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3 cursor-pointer"
                onClick={() => ref.current?.showModal()}
            >
                <Card className="h-full transition hover:shadow-md">
                    <CardContent className="p-6 flex flex-col items-center justify-center">
                        <div className="relative w-full h-40">
                            <Image
                                src={brand.image}
                                alt={brand.name}
                                fill
                                className="object-contain"
                                sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 25vw"
                            />
                        </div>
                        <p className="mt-4 text-center">{brand.name}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Modal */}
           <dialog
  ref={ref}
  className="
    open:fixed open:left-1/2 open:top-1/2 open:-translate-x-1/2 open:-translate-y-1/2
    open:m-0 open:p-0 rounded-lg backdrop:bg-black/60
  "
>
  <div className="bg-white rounded-lg p-6 w-[92vw] max-w-[720px]">

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-green-600">
          {brand.name}
        </h2>
        <p className="text-gray-600 text-sm mt-1">{brand.slug}</p>
      </div>

      <div className="relative sm:justify-self-end w-full sm:w-[260px] h-[80px] sm:h-[100px]">
        <Image src={brand.image} alt={brand.name} fill className="object-contain" />
      </div>
    </div>

    <div className="border-t mt-4 pt-4 flex justify-end">
      <button onClick={() => ref.current?.close()} className="px-4 py-2 border rounded">
        Close
      </button>
    </div>
  </div>
</dialog>



        </>
    );
}
