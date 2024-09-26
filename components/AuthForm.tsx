// this component is used to render the signup and signin form
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import SignupForm from './SignupForm';
import SigninForm from './SigninForm';
import ResetPasswordForm from "./ResetPasswordForm";
import { useEffect, useState } from "react";


const AuthForm:React.FC = () => {
    const [mounted,setMounted]=useState<boolean>(false)
    useEffect(() => {
        setMounted(true)
    },[])
    if(!mounted) return null
   
    return (
        
    <div className="bg-white  p-10 rounded-lg ">
   
       
       <Tabs defaultValue="account" className="w-auto md:w-[800px] mt-10 md:mt-0">
  <TabsList className='flex justify-between items-center'>
    <TabsTrigger value="account">Signup</TabsTrigger>
    <TabsTrigger value="password">Signin</TabsTrigger>
    <TabsTrigger value="resetpassword">ResetPassword</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <SignupForm/>
    </TabsContent>
  <TabsContent value="password">
    <SigninForm/>
    </TabsContent>
  <TabsContent value="resetpassword">
    <ResetPasswordForm/>
  </TabsContent>
</Tabs>

    </div>

    )
}
export default AuthForm;