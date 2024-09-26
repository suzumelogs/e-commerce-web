// this component is for footer
"use client";
import { set } from 'date-fns';
import React, { useEffect, useState } from 'react';

const Footer:React.FC = () => {
  const [mounted,setIsMounted]=useState<boolean>(false)
  const [show,setShow]=useState<boolean>(false)
  useEffect(() => {
      setIsMounted(true);
      setTimeout(() => {
        setShow(true)
      }, 1000);
  }, []);
  if(!mounted){
      return null
  }
    
    return (
        <footer className="mb-10 md:mb-1  bg-white border-t text-center">
      <div className="mx-auto py-10">
       {show && <p className="text-center text-xs text-black">
          &copy; 2023 Store, Inc. All rights reserved.
        </p> } 
      </div>
      </footer>
    )
}
export default Footer;