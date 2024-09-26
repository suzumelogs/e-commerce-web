"use client"
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import UpdatePasswordForm from './components/updatepassword';



const UpdatePasswordPage:React.FC = () => {
    const search=useSearchParams()
    const value=search.get('validation')
   const [muted,setMuted]=useState<boolean>(false)
   useEffect(()=>{
    setMuted(true)
   },[])
   if(!muted ) return null
    
    return (
        <div className="flex items-center  p-4 justify-center w-full h-full bg-[url('/signin-bg.svg')] rounded-lg  md:mx-5">
        <UpdatePasswordForm
        token={value}
         />
        </div>
    )
}
export default UpdatePasswordPage;