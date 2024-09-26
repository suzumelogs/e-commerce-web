// this component is used to display product information and reviews and add to cart button
"use client";

import { ShoppingCart } from "lucide-react";

import Currency  from "@/components/ui/currency";
import { Button } from "./ui/button";
import { MouseEventHandler, useState } from "react";
import useAuthModal from "@/hooks/modal/useAuthModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useCart from "@/hooks/useCart";
import { toast } from "react-toastify";
import useGetProductReviews from "@/hooks/useGetProductReviews";
import Rating from "./ui/rating";
import { Product } from "@/type";


interface InfoProps {
  data: Product
};

const Info: React.FC<InfoProps> = ({ data }) => {
  const [page, setPage] = useState<number>(1);
  const {data:reviews}=useGetProductReviews(data.id,page)
  const authModal = useAuthModal();
  const {data:user}=useCurrentUser()
  const cart=useCart()
  const [selectedValue, setSelectedValue] = useState<string >('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string >('');
  const handleSizeClick = (sizeValue: string) => {
    setSelectedValue(sizeValue);
  };
  const handleColorClick = (colorValue: string) => {
    setSelectedColor(colorValue);
  }  
  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    if(!user){
      authModal.onOpen()
      return

    }
    if(selectedValue===''||selectedColor===''){
      toast.error('Please select size and color')
      return
    }
    cart.addItem({
      id: data.id,
      quantity,
      size: selectedValue,
      color: selectedColor,
      price: data.price,
      name: data.name,
      image: data.Images?.[0]?.url,

    });
  };
 
  return ( 
    <div className=" p-5">
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-gray-900">Size:</h3>
          <div className="flex gap-5">
            {data.Sizes.map((size,index) => (
                <div
                className={`text-gray-900 p-3 w-auto text-center  rounded-md cursor-pointer border-2 ${
                  selectedValue === size.value ? 'border-red-500' : 'border-gray-300'
                } rounded`}
                key={index}
                onClick={() => handleSizeClick(size.value)}
              >{size.value}</div>

            ))}
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-gray-900">Color:</h3>
          {data.Colors.map((color,index) => (
            <div  className={`text-gray-900 p-3 w-13 cursor-pointer text-center border-2 ${
              selectedColor === color.value ? 'border-red-500' : 'border-gray-300'
            } rounded`}   key={index}
            onClick={() => handleColorClick(color.value)} style={{ backgroundColor: color.value }} />
          ))}
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <h1 className="font-semibold text-gray-900">Quantity:</h1>
        <div className="flex items-center gap-x-3">
         <Button onClick={() => setQuantity(quantity - 1)} disabled={quantity===1} className="flex items-center gap-x-2">-</Button>
          <h1 className="text-2xl font-bold text-gray-900">{quantity}</h1>
          <Button onClick={() => setQuantity(quantity + 1)} className="flex items-center gap-x-2">+</Button>
        </div>
      </div>
      {/* add to cart*/}
      <div className="mt-10 flex items-center gap-x-3">
        <Button  className="flex items-center gap-x-2" onClick={onAddToCart}>
          Add To Cart
          <ShoppingCart size={20} />
        </Button>
      </div>
        <div className="mt-3">
            <h3 className="font-semibold text-black">Description:</h3>
            <p className="text-gray-900">{data.description}</p>
        </div>
        {/* review */}
     {
      reviews?.averageRating!==undefined &&
      <div className="flex justify-start mt-5  items-center w-full">
        <div className="flex-col items-center justify-center">
        <h3 className="font-semibold text-black">Rating:</h3>
            <p className="text-4xl font-bold">{reviews?.averageRating}/<span className="text-gray-400 text-xl font-serif">5</span></p>
        <p className="text-xl text-gray-900">{reviews?.reviews?.length} reviews</p>
     {reviews?.averageRating!==undefined && <Rating value={reviews?.averageRating}/> } 
        </div>
      </div>
     } 
      
    </div>
  );
}
 
export default Info;