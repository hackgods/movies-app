// Import necessary modules
import React, { useState } from 'react';
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa6";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import Image from 'next/image';
import { userSignup } from '@/utils/apiUtils'; 
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';



function SignUpCard() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [userInfo, setUserInfo] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
    const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
  
    // Function to toggle password visibility
    const toggleVisibility = () => setIsVisible(!isVisible);
  
    // Function to handle form submission
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();
        
      // Check for form completeness
      if (!userInfo.firstName || !userInfo.lastName || !userInfo.email || !userInfo.password) {
        setFormError('Please fill out all fields');
        return;
      } else if (selectedAvatar === null) {
        setFormError('Select a profile avatar');
        return;
      }
    
  
      // Call API function for signing up
      const res = await userSignup(
        userInfo.firstName,
        userInfo.lastName,
        userInfo.email,
        userInfo.password,
        selectedAvatar+1
      );

      console.log(res);
      
    // If signup is successful, sign in the user
    if (res.status === 201) {
    const signInResult = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      callbackUrl: '/'
    }); 
    
    console.log("Sign up successfull");
}
    
      console.log(res);
    };
  
    // Function to handle avatar selection
    const handleAvatarClick = (index: number) => {
      setSelectedAvatar(index === selectedAvatar ? null : index);
    };
  
    // Render the component
    return (
      <div className="flex justify-center m-4 transition-all duration-200 ease-in animate-fade-up">
        <Card shadow="sm" className="border-none bg-background">
          <CardBody className="flex flex-row">
            <form onSubmit={handleSubmit} className="p-3 mx-2 space-y-12">
              <h1 className="pb-4 text-3xl font-bold text-white md:text-3xl lg:text-3xl">
                Create new account
              </h1>
  
              {/* Display form error */}
              {formError && <p className="text-red-500">{formError}</p>}
  
              
              {/* First Name Input */}
              <Input
                type="text"
                label="First Name"
                placeholder="Harvey"
                labelPlacement="outside"
                value={userInfo.firstName}
                onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                startContent={<FaUser className="flex-shrink-0 text-2xl pointer-events-none text-default-400" />}
              />
  
              {/* Last Name Input */}
              <Input
                type="text"
                label="Last Name"
                placeholder="Specter"
                labelPlacement="outside"
                value={userInfo.lastName}
                onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                startContent={<FaUser className="flex-shrink-0 text-2xl pointer-events-none text-default-400" />}
              />
  
              {/* Email Input */}
              <Input
                type="email"
                label="Email"
                placeholder="you@email.com"
                labelPlacement="outside"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                startContent={<FaEnvelope className="flex-shrink-0 text-2xl pointer-events-none text-default-400" />}
              />
  
              {/* Password Input */}
              <Input
                label="Password"
                placeholder="Enter password"
                labelPlacement="outside"
                value={userInfo.password}
                onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                startContent={<FaLock className="flex-shrink-0 text-2xl pointer-events-none text-default-400" />}
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
  
              {/* Profile Photo Selection Section for small screen */}
              <div className="grid grid-cols-3 gap-8 sm:hidden">
                {[...Array(9)].map((_, index) => (
                  <div
                    key={index}
                    className={`w-20 h-20 relative cursor-pointer bg-cyan-900 transition-transform transform hover:scale-110 ${
                      index === selectedAvatar
                        ? 'border-2 border-white rounded-full'
                        : 'border border-slate-800 rounded-full'
                    }`}
                    onClick={() => handleAvatarClick(index)}
                  >
                    <Image
                      src={`/avatars/${index + 1}.png`}
                      alt={`Profile ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                ))}
              </div>
  
              {/* Submit Button */}
              <Button type="submit" className="bg-cyan-500" >
                Sign Up
              </Button>
  
              {/* Log In Button (You can link it to your login page) */}
              <Button variant="flat" className="mx-4" onClick={() => router.push('/login')}>
                Log In
              </Button>

            </form>
  
            {/* Profile Photo Selection Section for md and lg */}
            <div className="grid items-center justify-center hidden grid-cols-3 gap-3 p-10 px-1 sm:grid">
              {[...Array(9)].map((_, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 m-4 relative cursor-pointer bg-cyan-900 transition-transform transform hover:scale-110 ${
                    index === selectedAvatar
                      ? ' border-white border-2 rounded-full'
                      : 'border border-slate-800 rounded-full'
                  }`}
                  onClick={() => handleAvatarClick(index)}
                >
                  <Image
                    src={`/avatars/${index + 1}.png`}
                    alt={`Profile ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
  
  export default SignUpCard;
  