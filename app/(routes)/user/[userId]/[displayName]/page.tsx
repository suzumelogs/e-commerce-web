// used for user profile page
"use client"

import React,{useEffect, useState} from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';

import Header from '@/components/ui/header';
import Container from '@/components/ui/container';



type pageProps = {
    params:{
        userId:string
        displayName:string
    }
}

const Profile:React.FC<pageProps>= () => {
    const {data,isLoading}=useCurrentUser()
    const [mounted,setIsMounted]=useState<boolean>(false)
    const pathname=usePathname()

    const routes=[
        {
            href:`${pathname}/settings`,
            label:'Settings',
            isActive:pathname.includes('settings')

        },
    ]
 
    useEffect(() => {
        setIsMounted(true);
      }, []);
    if(!mounted){
        return null
    }
    else if(!data && !isLoading){
        <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold">You are not eligible to access this page.</h1>
       
</div>
        
    }
    return (
                <Container>
                        <Header
                        title='Profile Information'
                        description='Welcome to the Profile section! 🎉 Here, you&apos;ll find all the essential components that make up your unique and personalized profile.'
                        />    
                            <div className='flex flex-col items-center'>
                               
                   {data?.avatarUrl &&<Image src={data.avatarUrl} style={{"objectFit":"cover"}} height={300} width={300} alt={'profile'}  className='rounded'/> } 
                               
                            </div>
                            <div className='p-2 mt-3 lg:flex lg:items-center lg:justify-center gap-20'>
                            <div className='flex flex-col items-center'>
                                <h1 className='text-2xl font-semibold'>Name</h1>
                                <p className='text-md font-semibold'>{data?.displayName}</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <h1 className='text-2xl font-semibold'>Email</h1>
                                <p className='text-md font-normal'>{data?.email}</p>
                            </div>

                            </div>
                            <div className='flex justify-center  gap-10 hover:underline cursor-pointer'>
                          {routes.map((route,index)=>(
                              <Link href={route.href}  key={index}>
                                    <p className={`text-lg font-semibold ${route.isActive ? 'text-blue-500' : 'text-gray-500'}`}>{route.label}</p>
                              </Link>
                          ))}

                            </div>
            

                </Container>
         
               
           
    
    )
}
export default Profile;