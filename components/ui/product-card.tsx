// this component is used to display product card in product list page
"use client"
import React, { useEffect, useState,MouseEventHandler, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import IconButton from './icon-button';
import { Expand } from "lucide-react";
import Currency from './currency';
import usePreviewModal from '@/hooks/modal/usePreviewModal';
import Rating from './rating';
import { Product } from '@/type';


type productcartProps = {
    data:Product;  
};

const ProductCard:React.FC<productcartProps> = ({data}) => {
  // calculate average rating
  const [mounted,setIsMounted]=useState<boolean>(false)
  const totalRating = data.rewiews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / data.rewiews.length;
    const router=useRouter()
    const previewModal = usePreviewModal();
    useEffect(() => {
      setIsMounted(true);
    }, [])
    if(!mounted) return null
  const hanleClick=()=>{
    router.push(`/product/${data.id}/${data.name}`)
  }
  // product preview
  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };


    return (
      <>

        <div className='bg-white group cursor-pointer rounded-xl border  p-3 space-y-4'  onClick={hanleClick}>
            <div className='aspect-square rounded-xl bg-gray-100 relative'>
            <Image 
          src={data.Images?.[0]?.url} 
          alt="E-commerce" 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="aspect-square object-cover rounded-md"
        />
        <div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5'>
            <div className='flex gap-x-6 justify-center'>
            <IconButton 
              onClick={onPreview} 
              icon={<Expand size={20} className="text-gray-600" />}
            />
            </div>
        </div>
            </div>
            <div>
            <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category?.name}</p>
      </div>
              {/* Price & Reiew */}
      <div className="flex-col mx-2 items-center mt-1">
          {Number.isNaN(averageRating)===false &&  <Rating value={averageRating} /> }
        <Currency value={data?.price} />
      </div>
            </div>

        </div>
      </>
    )
}
export default ProductCard;