// singnin form component
"use client"
import  { useState } from 'react';
import {useForm} from "react-hook-form"
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LocalStorageManager from "@/lib/LocalStorageManager"

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'react-toastify';
import Header from './ui/header';



const formSchema = z.object({
    email: z.string().email().nonempty(),
   
});
const ResetPasswordForm:React.FC= () => {
    const [loading, setLoading] = useState<boolean>(false);
    const form= useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setLoading(true);
     await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,data).then(()=>{
           setLoading(false);
            toast('Email Send',{
                type:'success' 
            })
           window.location.href = '/';
     }).catch((err)=>{
            setLoading(false);
            toast.error(err.response.data.message)
     })
    }
  
    return(
        <>
              <Header
            title="Reset your password"
            description='Enter your email address below and we will send you a link to reset your password.'
           />
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className='mt-2'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input key={field.name} disabled={loading}  placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end items-center mt-5 '>
                <Button type="submit"  disabled={form.formState.isSubmitting}>
                    {loading ? 'Loading...' : 'Reset Password'}
                    </Button>
            </div>
            </form>
            </Form>
        </>
    )
}
export default ResetPasswordForm;