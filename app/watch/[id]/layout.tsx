import React from 'react';
import { Navbar } from '@/components/navbar';
import "@/styles/globals.css";
import { fontSans } from "@/config/fonts";
import { Providers } from "../../providers";
import { Link } from "@nextui-org/link";
import clsx from "clsx";


interface WatchLayoutProps {
  children: React.ReactNode;
}

const WatchLayout: React.FC<WatchLayoutProps> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
			<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
			{/* Content Security Policy */}
			{/* <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://vidsrc.to/ https://vidplay.site https://fonts.googleapis.com https://fonts.gstatic.com https://www.gstatic.com https://vidrock2.store https://lzoy.mcloud.bz 
https://s3.bunnycdn.ru https://whos.amung.us 
https://lzoy.vidrock2.store ;"></meta> */}

			</head>
     
      <body
				className={clsx(
					"font-sans",
					fontSans.variable,
					"overflow-hidden" // Prevent body from scrolling
				  )}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="flex flex-col min-h-screen">
						<main className="overflow-y-auto">
							{children}
						</main>
					</div>
				</Providers>
			</body>
    </html>
  );
};

export default WatchLayout;
