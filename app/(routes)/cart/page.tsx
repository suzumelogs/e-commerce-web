"use client"
import React, { useEffect, useState } from 'react';

import Container from '@/components/ui/container';
import useCart from '@/hooks/useCart';
import CartItem from './components/cartItem';
import Summary from './components/summary';
import useCurrentUser from '@/hooks/useCurrentUser';



const CartPage:React.FC = () => {
    const [mounted,setIsMounted]=useState<boolean>(false)
    const {data:user,isLoading}=useCurrentUser()
    const cart=useCart()
    useEffect(() => {
        setIsMounted(true);
    }, [])
    if(!mounted) return null
    return(
        <div className="bg-white">
        <Container>
          <div className="px-4 py-16 sm:px-6 lg:px-8 mt-5">
            <h1 className="text-3xl font-bold text-black">{user?.displayName} &apos;s Beg</h1>
            <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
              <div className="lg:col-span-7">
                {cart.items.length === 0 && <p className="text-neutral-500">No items added to cart.</p>}
                <ul>
                  {cart.items.map((item) => (
                    <CartItem key={item.id} data={item} />
                  ))}
                </ul>
              </div>
              <Summary />
            </div>
          </div>
        </Container>
      </div>
    )
}
export default CartPage;