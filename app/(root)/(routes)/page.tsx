// home page 
"use client"
// 
export const revalidate = 0;

import {useEffect,  useMemo,  useState } from "react"
import useGetAllBillboards from "@/hooks/useGetAllBillboards"


import Billboards from "@/components/Billboards"
import ManCategories from "@/components/ManCategories";
import ProductList from "@/components/ProductList"
import WomanCategories from "@/components/WomanCategories";
import Container from "@/components/ui/container"

import { Loader } from "@/components/ui/loader";
import useGetMenCategories from "@/hooks/useGetMenCategories";
import useGetWomenCategories from "@/hooks/useGetWomenCategories ";
import React from "react";
import useGetProducts from "@/hooks/useGetProducts";

import NumberPagination from "@/components/ui/NumberPagination";
import { Button } from "@/components/ui/button";



export default function Home() {
  const [page,setPage]=useState<number>(1)
  const [showButton,setShowButton]=useState<boolean>(false)
  const {data:billboard,isLoading}=useGetAllBillboards()
  // get all categories for men
  const {data:mancategories,isLoading:mancategoriesLoadin}=useGetMenCategories()
  // get all categories for women
 
  const {data:womancategories,isLoading:femalecategoriesLoading}=useGetWomenCategories()
  const {data:productsData,isLoading:productsLoading,isPreviousData}=useGetProducts({
    page:page,
    isFeatured:true
  })
  useEffect(() => {
    setTimeout(() => {
      setShowButton(true)
    }, 2000);

  })
  const mergedData = useMemo(() => {
   return {
     billboard,
     mancategories,
     womancategories,
   };
  }, [billboard, mancategories, womancategories]);
  const totalPages = productsData?.pagination.total_pages || 0;
const totalPagesArray = Array.from({ length: totalPages }, (_, index) => index + 1);
 
  if(mancategoriesLoadin || femalecategoriesLoading ||isLoading || productsLoading)   {
    return (
      <Loader />
    )
  }

 const prevPage=()=>{
    setPage(page-1)
 }

  return (
    <>
   {mergedData.billboard && <Billboards data={mergedData.billboard} /> }
  <Container>
  
          <>
            {mergedData.mancategories && <ManCategories data={mergedData.mancategories} title="Men Categories" />}
            {mergedData.womancategories && <WomanCategories data={mergedData.womancategories} title="Women Categories" />}
          </>
          {productsData?.products &&<ProductList items={productsData?.products} title="Feature Prouducts" />}
         {showButton &&productsData?.products && <div  className="flex items-center mb-2 mt-5 justify-center gap-5 p-2">
          <Button onClick={prevPage} disabled={isPreviousData || page === 1}>&lt;&lt;</Button>
       {totalPagesArray.map((page,index) => (
          <NumberPagination key={page} page={page} setPage={setPage} />
          ))}
                    <Button onClick={()=>{
                      setPage(totalPages)
                    }} disabled={isPreviousData || page === totalPages}>&gt;&gt;</Button>
          </div> } 
         
  </Container>
    </>
  )
}
