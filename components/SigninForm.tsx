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
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Header from './ui/header';





const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
});
const SigninForm:React.FC= () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [passwordType, setPasswordType] = useState<string>("password");
    const form= useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setLoading(true);
     await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,data).then((res)=>{
            setLoading(false);
            LocalStorageManager.setItemWithExpiration('token',res.data.access_token,60);
            toast('Logged in successfully',{
                type:'success' 
            })
           window.location.href = '/';
     }).catch((err)=>{
            setLoading(false);
            toast.error(err.response.data.message)
     })
    }
    const ShowPassword= () => {
      if (passwordType === "password") {
          setPasswordType("text");
      } else {
          setPasswordType("password");
      }

  };
    return(
        <>
              <Header
            title="Login to your account"
            description='Welcome to the Signin section! Please fill in the form below to signin.'
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
              <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className='mt-2'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                  <div className='relative'>
                    <Input key={field.name} className='relative' disabled={loading} type={passwordType} placeholder="Password" {...field} />
                   {passwordType==="password" && <EyeIcon className='absolute top-1/2 right-1 -translate-y-1/2  cursor-pointer text-gray-400' onClick={ShowPassword}  size={20}/> } 
                    {passwordType==="text" && <EyeOffIcon className='absolute top-1/2 right-1 -translate-y-1/2  cursor-pointer text-gray-400' onClick={ShowPassword}  size={20}/>}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end items-center mt-5 '>
                <Button type="submit"  disabled={form.formState.isSubmitting}>
                    {loading ? 'Loading...' : 'Signin'}
                    </Button>
            </div>
            </form>
            </Form>
        </>
    )
}
export default SigninForm;