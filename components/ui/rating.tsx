// Desc: This component is used to display the rating of a product
import React from 'react';
import { StarHalf , Star} from 'lucide-react';

type ratingProps = {
    value:number
    
};

const Rating:React.FC<ratingProps> = ({value}) => {
    const ratingStars=Array.from({length:5},(_,i)=>{
        let number=i+0.5;
        return(
            <div key={i}>
                {value>=i+1 ? <Star className='text-yellow-500'/> : value>=number ? <StarHalf className='text-yellow-500'/> : <Star className='text-white'/>}
            </div>
        )
    })
   
    
    return (
        <div className='flex justify-center items-center p-3'>
          
                 {ratingStars}
            
      </div>
    )
}
export default Rating;