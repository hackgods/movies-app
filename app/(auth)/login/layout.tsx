import React from 'react';
import "@/styles/globals.css";
import { fontSans } from "@/config/fonts";
import { Providers } from "../../providers";
import { Link } from "@nextui-org/link";
import clsx from "clsx";


interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
			<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
			
			</head>
     
      <body
				className={clsx(
					"font-sans antialiased h-screen after:bg-login after:bg-center after:bg-cover after:bg-fixed after:absolute after:inset-0 after:z-[-1]",
					fontSans.variable,
					"overflow-hidden"
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

export default LoginLayout;
