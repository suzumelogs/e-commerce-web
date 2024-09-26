// this component is for desktop navigation functionality: got to user profile, logout, search
"use client"
import { User } from '@/hooks/useCurrentUser';
import { usePathname,useRouter } from 'next/navigation';
import {useCallback, useEffect,useState} from 'react';
import { Input } from '../ui/input';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import {Smile,Package,Star,LogOut} from "lucide-react"
import NavbarAction from './NavbarAction';

type MainNavProps = {
    user:User
};

const DesktopNav:React.FC<MainNavProps> = ({user}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const pathname = usePathname();
  const router=useRouter()
  useEffect(() => setMounted(true), []);
  const onSearch=useCallback((event:React.FormEvent)=>{
    event.preventDefault()
    const encodedSearch=encodeURI(search)
    router.push(`/result?search_query=${encodedSearch}`)
},[search,router])
  if (!mounted) return null;
  
 
     const logout = () => {
      localStorage.removeItem('token');
    };
    const handleLogout=()=>{
      logout();
      window.location.href = '/auth';
    }
    const handleProfle=()=>{
      if(pathname.includes(`/user/${user?.id}/${user?.displayName}`)) return;
      else router.push(`/user/${user?.id}/${user?.displayName}`)
    }
    const goToOrdersPage=()=>{
      if(pathname.includes(`/user/${user?.id}/${user?.displayName}/orders`)) return;
      else router.push(`/user/${user?.id}/${user?.displayName}/orders`)
    }
    const goToReviewsPage=()=>{
      router.push(`/user/${user?.id}/${user?.displayName}/reviews`)
    }
    return (
        <nav className='hidden md:flex gap-6  w-full'> 
            <div className='hidden md:block w-full'>
              <form onSubmit={onSearch}>
              <Input   onChange={(e)=>setSearch(e.target.value)}
         value={search} type='search' placeholder='Search' />
              </form>
            </div>
            {/** this component is responsible for user profile review order route*/}
            <Menubar className='w-full'>
            <MenubarMenu>
              <MenubarTrigger className='hover:cursor-pointer hover:text-red-600 hover:underline text-lg'>{user.displayName} &apos;s Profile</MenubarTrigger>
              <MenubarContent>
                <MenubarItem className='hover:underline cursor-pointer' onClick={handleProfle}><Smile className='mr-2'/> Manage My Account</MenubarItem>
                <MenubarSeparator />
                <MenubarItem className='hover:underline cursor-pointer'  onClick={goToReviewsPage}><Star className='mr-2'/>My Reviews</MenubarItem>
                <MenubarSeparator />
                <MenubarItem className='hover:underline cursor-pointer' onClick={goToOrdersPage}><Package className='mr-2'/>My Orders</MenubarItem>
                <MenubarSeparator />
                <MenubarItem className='hover:underline cursor-pointer' onClick={handleLogout}><LogOut className='mr-2'/>Logout</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </nav>
    )
}
export default DesktopNav;