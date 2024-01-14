"use client";
import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'
import SignUpCard from '@/components/signup-card';

function Signup() {
    const { data: session, status } = useSession();

    // Wait for the session to load
    if (status === 'loading') {
        return null; // Render nothing while the session is loading
    }

    // If the user is logged in, redirect to '/'
    if (session) {
        redirect('/');
        return null; // Render nothing if redirecting
    }

    // If the user is not logged in, show the SignUpCard
    return (
        <div className='flex items-center justify-center h-screen'>
            <SignUpCard />
        </div>
    );
}

export default Signup;
