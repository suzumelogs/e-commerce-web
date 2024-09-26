"use client"
import Pagination from '@/components/ui/Pagination';
import Billboard from '@/components/ui/billboard';
import Container from '@/components/ui/container';
import { Loader } from '@/components/ui/loader';
import NoResults from '@/components/ui/no-results';
import ProductCard from '@/components/ui/product-card';
import useGetCategoryById from '@/hooks/useGetCategoryById';
import useGetProducts from '@/hooks/useGetProducts';
import { Product } from '@/type';
import React, { useEffect, useState } from 'react';

type pageProps = {
    params:{
        categoryId:string
        categoryName:string
    },
};

const Category:React.FC<pageProps> = ({params}) => {
  const [mounted,setMounted]=useState<boolean>(false)
    const encodedString = params.categoryName;
    const [page,setPage]=useState<number>(1)
    // remove %20 from string
    const decodedString = decodeURIComponent(encodedString);
    // get products by category
    const {data,isFetching,isLoading:categoriesProductLoader}=useGetProducts({
        'category[name]': decodedString,
        page:page,
    })
    // get category by id
    const {data:category,isLoading}=useGetCategoryById(params.categoryId)
    // fixed bug when refresh page
    useEffect(() => {
        setMounted(true);
    }, [])
    if(!mounted) return null
    const nextPage=()=>{
        setPage(page+1)
    }
    const prevPage=()=>{
        setPage(page-1)
    }
    if(isLoading || categoriesProductLoader) {
      return(
        <Loader />
      )
    }

    return (
      <>
        <div className="bg-white">
        <Container>
       {category &&  <Billboard data={category.billboard} /> }
          <div className="px-4 sm:px-6 lg:px-8 pb-24">
            <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
              <div className="hidden lg:block">
              
              </div>
               <div className="mt-6 lg:col-span-4 lg:mt-0">
                {data?.products?.length === 0 && <NoResults />}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data?.products?.map((item:Product) => (
                    <ProductCard key={item.id} data={item} />
                  ))}
                </div>
            { <Pagination page={page} prev={prevPage} next={nextPage} productLength={data?.products?.length} />}
              </div>

            </div>
                  
          </div>
        </Container>
      </div>
        </>
    )
}
export default Category;