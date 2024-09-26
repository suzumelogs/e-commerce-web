
// show product review
import Gallery from '@/components/gallery';
import Rating from '@/components/ui/rating';
import { Review } from '@/type';
import { format } from 'date-fns';
import React from 'react';

type reviewitemProps = {
    data:Review  
};

const ReviewItem:React.FC<reviewitemProps> = ({data}) => {
    
    
    return(
        <div className={`flex items-center justify-start mb-2 p-2`}>
          <div className=' w-full p-5'>
            <div>
                <Rating value={data.rating}/>
            </div>
            <div>
               <p className='text-sm font-bold text-gray-500'>by {data.user.displayName}</p>
            </div>
            <div>
                <p className='text-lg  text-neutral-700'>{data.comment}</p>
            </div>
            <div className=''>
            <p className='text-lg text-gray-500'> {format(new Date(data.createdAt), 'MMMM do, yyyy').toString()}</p>
            </div>
        
           <div className=''>
           <Gallery images={data.images}/>
         </div>
          </div>
        </div>
      
    )
}
export default ReviewItem;