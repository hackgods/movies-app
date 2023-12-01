import { signOut, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const handleLogout = async (callbackUrl: string = window.location.pathname) => {
  await signOut({ callbackUrl });
};


export const handleLogin = async (router: ReturnType<typeof useRouter>) => {
  
  const currentUrl = encodeURIComponent(window.location.href);
  // Redirect to the login page
  router.push(`/login?callbackUrl=${currentUrl}`);
};
