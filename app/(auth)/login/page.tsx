"use client";
import React from 'react';
import LoginCard from '@/components/login-card';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'

function Login() {
    const { data: session, status } = useSession();

    // If the user is not logged in, show the login card
    return (
        <div className='flex items-center justify-center h-screen'>
            <LoginCard />
        </div>
    );
}

export default Login;
