"use client"

import {
Navbar as NextUINavbar,
NavbarContent,
NavbarMenu,
NavbarMenuToggle,
NavbarBrand,
NavbarItem,
NavbarMenuItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar
} from "@nextui-org/react";
import React, { useEffect, useState } from 'react';
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
GithubIcon,
LinkedInIcon,
HeartFilledIcon,
SearchIcon,
} from "@/components/icons";

import { Logo } from "@/components/icons";
import { search } from "@/utils/apiUtils";
import {  Autocomplete,  AutocompleteSection,  AutocompleteItem} from "@nextui-org/autocomplete";

import SearchBar from "./searchbar";
import { MovieModel } from "@/models/movieModel"
import { useSession, signIn, signOut } from "next-auth/react"
import { handleLogout, handleLogin } from '@/utils/authUtils';
import { useRouter } from 'next/navigation';


  
export const Navbar = () => {

const { data: session, status } = useSession()

const router = useRouter();

const [searchValue, setSearchValue] = useState('');
const [movieSuggestions, setMovieSuggestions] = useState<MovieModel[]>([]);
// Function to fetch movie suggestions from your server
// Effect to fetch movie suggestions when searchValue changes
useEffect(() => {
const searchResults = async (query: string) => {
try {
const searchData = await search(query);
setMovieSuggestions(searchData);
} catch (error) {
console.log(error);
}
};

if (searchValue.trim() !== '') {
searchResults(searchValue);
} else {
setMovieSuggestions([]); // Clear suggestions if searchValue is empty
}
}, [searchValue]);

const searchInput = (
<Input
aria-label="Search"
classNames={{
inputWrapper: "bg-default-100 w-80",
input: "text-sm",
}}

labelPlacement="outside"
placeholder="Search"
startContent={
<SearchIcon className="flex-shrink-0 text-base pointer-events-none text-default-400" />
}
type="search"
/>
);

return (
<NextUINavbar maxWidth="xl" position="sticky">
<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
<NavbarBrand as="li" className="gap-3 max-w-fit">
<NextLink className="flex items-center justify-start gap-1" href="/">
<p className="font-bold text-inherit">MOVIES +</p>
</NextLink>
</NavbarBrand>
<ul className="justify-start hidden gap-4 ml-2 md:flex">
{siteConfig.navItems.map((item) => (
<NavbarItem key={item.href}>
<NextLink
className={clsx(
linkStyles({ color: "foreground" }),
"data-[active=true]:text-primary data-[active=true]:font-medium"
)}
color="foreground"
href={item.href}
>
{item.label}
</NextLink>
</NavbarItem>
))}
</ul>
</NavbarContent>

<NavbarContent
className="hidden sm:flex basis-1/5 sm:basis-full"
justify="center"
>

<NavbarItem className="flex-auto hidden mx-10 md:flex">
	<SearchBar searchValue={searchValue} setSearchValue={setSearchValue} movieSuggestions={movieSuggestions} />
</NavbarItem>

</NavbarContent>

<NavbarContent className="pl-40 sm:hidden basis-1" justify="end">
<NavbarMenuToggle />
</NavbarContent>

{session ? (

<NavbarContent as="div" className="items-center" justify="end">

<Dropdown placement="bottom-end">
<DropdownTrigger>
<Avatar
isBordered
as="button"
className="transition-transform"
color="default"
name="Profile"
size="md"
src={`/avatars/${session.user?.profileEmoji}.png`}
/>
</DropdownTrigger>
<DropdownMenu aria-label="Profile Actions" variant="flat">
<DropdownItem key="profile" className="gap-2 h-14">
<p className="font-semibold">Signed in as</p>
<p className="font-semibold">{session.user?.email}</p>
</DropdownItem>
<DropdownItem key="settings">My Settings</DropdownItem>
<DropdownItem key="logout" color="danger" onClick={() => handleLogout()}>
Log Out
</DropdownItem>
</DropdownMenu>
</Dropdown>
</NavbarContent>
) : status === "loading" ? null : (
	<NavbarItem>
	  <Button className="bg-cyan-600" onClick={() => handleLogin(router)}>
		Log In
	  </Button>
	</NavbarItem>
  )}




<NavbarMenu>

<SearchBar searchValue={searchValue} setSearchValue={setSearchValue} movieSuggestions={movieSuggestions} />
	
<div className="flex flex-col gap-2 mx-2 mt-2">
{siteConfig.navMenuItems.map((item, index) => (
<NavbarMenuItem key={`${item}-${index}`}>
<Link
color={
index === 2
? "primary"
: index === siteConfig.navMenuItems.length - 1
? "danger"
: "foreground"
}
href={item.href}
size="lg"
>
{item.label}
</Link>
</NavbarMenuItem>
))}
</div>
</NavbarMenu>
</NextUINavbar>
);
};