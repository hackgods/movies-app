"use client"

import React, { useState } from 'react';
import "@/styles/globals.css";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa6";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import Image from 'next/image';

import { userLogin } from '@/utils/apiUtils';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function LoginCard() {
  const router = useRouter();
  
  const callbackParams = useSearchParams()
 
  const callback = callbackParams.get('callbackUrl') || '/';
  const { data: session } = useSession();

  
  const [isVisible, setIsVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', { email: userInfo.email, password: userInfo.password});
    console.log(res);
  };


  if (session) {
    console.log("Callback: " + callback);
    redirect(callback);
  }

  return (
    <div className="flex justify-center m-4">
      <Card shadow="sm" className='border-none bg-background'>
        <CardBody className='flex flex-row'>
          <form onSubmit={handleSubmit} className='w-1/2 mx-2 space-y-12'>
            <h1 className="pb-4 font-bold text-white sm:text-2xl md:text-3xl lg:text-3xl">
              Login
            </h1>

            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              labelPlacement="outside"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              startContent={
                <FaEnvelope className="flex-shrink-0 text-2xl pointer-events-none text-default-400" />
              }
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              labelPlacement="outside"
              value={userInfo.password} 
              onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
              startContent={
                <FaLock className="flex-shrink-0 text-2xl pointer-events-none text-default-400" />
              }
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <FaEyeSlash className="text-2xl pointer-events-none text-default-400" />
                  ) : (
                    <FaEye className="text-2xl pointer-events-none text-default-400" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />

            <Button type='submit' className='bg-cyan-500'>
              Continue
            </Button>
            <Button variant='flat' className='mx-4' onClick={() => router.push('/signup')}>
              Sign Up
            </Button>
          </form>

          <div className='w-3/4 mx-2'>
            <Image
              className='rounded-xl'
              src="http://image.tmdb.org/t/p/original/feSiISwgEpVzR1v3zv2n2AU4ANJ.jpg"
              alt="Movie of the Day"
              width={800}
              height={500}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default LoginCard;
