// this component is for unauthenticated navigation
"use client"
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import {cn} from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { Input } from '../ui/input';



const UnAuthNav:React.FC= () => {
  const [search, setSearch] = useState<string>("");
  const router=useRouter()
  const currentPath=usePathname()
    const data=[
        {
            label:"Home",
            href:"/",
            isActive:currentPath=== "/"
        },
        {
            label:"Signin/Signup",
            href:"/auth",
            isActive:currentPath === "/auth"
        } 
    ]
    const onSearch=useCallback((event:React.FormEvent)=>{
      event.preventDefault()
      const encodedSearch=encodeURI(search)
      router.push(`/result?search_query=${encodedSearch}`)
  },[search,router])
    return (
        <nav className='hidden md:block w-full'> 
               <div className='flex justify-center items-center gap-5'>
                { data.map((item)=>(
                       <Link
                       key={item.href}
                       href={item.href}
                       className={cn(
                         'text-sm font-medium transition-colors hover:text-black',
                         item.isActive ? 'text-black' : 'text-neutral-500'
                       )}
                     >
                       {item.label}
                   </Link>
                ))}
                <div className=' w-full p-3'>
                <form onSubmit={onSearch}>
              <Input onChange={(e)=>setSearch(e.target.value)}
         value={search} type='search' placeholder='Search' />
              </form>
            </div>
            </div>
        </nav>
    )
}
export default UnAuthNav;