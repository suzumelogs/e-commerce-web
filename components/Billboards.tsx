// this component is for billboards
"use client"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Billboard } from '@/type';

import {  useEffect, useState } from 'react';

interface BillboardProps {
    data: Billboard[];
   
  }
  
  const Billboards: React.FC<BillboardProps> = ({
    data,
  }) => {
    const [mute, setMute] = useState<boolean>(false);
    const [render, setRender] = useState<boolean>(false);
    useEffect(() => {
      setMute(true)
      setTimeout(() => {
        setRender(true)
      }, 1000);
    }, []);
    if(!mute) return null
  
    const divStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundSize: 'cover',
      height: '344px', 
    }
    return ( 
      <>
      <div className="slide-container p-3">
        <Slide canSwipe  autoplay duration={10000}>
         {data?.map((data, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${data.imageUrl})` }}>
              <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          {render && <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
            {data.label}
          </div> 
          </div>
  }
        </div>
            </div>
            </div>
          ))} 
        </Slide>
      </div>
      </>
     );
  };
  
  export default Billboards;