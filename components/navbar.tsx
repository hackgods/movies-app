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
import { search } from "@/app/api";
import {  Autocomplete,  AutocompleteSection,  AutocompleteItem} from "@nextui-org/autocomplete";

interface Movie {
	_id: string;
	id: number;
	videoUrl: string;
	title: string;
	overview: string;
	backdropPath: string;
	genres: string[];
	homepage: string;
	popularity: number;
	posterPath: string;
	productionCompanies: string[];
	productionCountries: string[];
	revenue: number;
	runtime: number;
	spokenLanguages: string[];
	status: string;
	voteAverage: number;
	voteCount: number;
	ytLink: string;
	ytID: string;
	__v: number;
  }
  
export const Navbar = () => {
const [searchValue, setSearchValue] = useState('');
const [movieSuggestions, setMovieSuggestions] = useState<Movie[]>([]);
const BASE_URL = "https://image.tmdb.org/t/p/original/";
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
className="hidden bg-white sm:flex basis-1/5 sm:basis-full"
justify="center"
>

<NavbarItem className="hidden md:flex">
<Autocomplete
	  inputValue={searchValue}
	  onInputChange={(newValue) => setSearchValue(newValue)}
      classNames={{
        base: "max-w-[100rem]",
        listboxWrapper: "max-h-[320px]",
        selectorButton: "text-default-500"
      }}
      defaultItems={movieSuggestions}
      inputProps={{
        classNames: {
          input: "ml-1",
          inputWrapper: "h-[48px]",
        },
      }}
      listboxProps={{
        hideSelectedIcon: true,
        itemClasses: {
          base: [
            "rounded-large",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "dark:data-[hover=true]:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[hover=true]:bg-default-200",
            "data-[selectable=true]:focus:bg-default-100",
            "data-[focus-visible=true]:ring-default-500",
          ],
        },
      }}
      aria-label="Search"
      placeholder="Search"
      popoverProps={{
        offset: 15,
        classNames: {
          base: "rounded-large",
          content: "p-1 border-small border-default-100 bg-background",
        },
      }}
      startContent={<SearchIcon className="text-default-400" strokeWidth={2.5} size={20} />}
      radius="lg"
	  size="md"
	  fullWidth={true}
      
    >
      {(item) => (
        <AutocompleteItem key={item.id} textValue={item.title}>
			
		  <NextLink href={{
          pathname: `/movie/${item.id}`,
          }}> 
	  <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
			<Avatar alt={item.title} className="flex-shrink-0" size="md" src={BASE_URL+item.posterPath} />
              <div className="flex flex-col">
                <span className="text-small">{item.title}</span>
                <span className="text-tiny text-default-400">{item.overview}</span>
              </div>
            </div>
          </div>
	 </NextLink>
        </AutocompleteItem>
      )}
    </Autocomplete>
</NavbarItem>

</NavbarContent>

<NavbarContent className="pl-40 sm:hidden basis-1" justify="end">
<NavbarMenuToggle />
</NavbarContent>

<NavbarContent as="div" className="items-center" justify="end">

<Dropdown placement="bottom-end">
<DropdownTrigger>
<Avatar
isBordered
as="button"
className="transition-transform"
color="default"
name="Profile"
size="sm"
src="https://lh3.googleusercontent.com/a/ACg8ocKZvvBa887mHZrWwPPTR_DDwuR20BFgQS2FSQJXL3KVCxA=s576-c-no"
/>
</DropdownTrigger>
<DropdownMenu aria-label="Profile Actions" variant="flat">
<DropdownItem key="profile" className="gap-2 h-14">
<p className="font-semibold">Signed in as</p>
<p className="font-semibold">hackgod@gmail.com</p>
</DropdownItem>
<DropdownItem key="settings">My Settings</DropdownItem>
<DropdownItem key="logout" color="danger">
Log Out
</DropdownItem>
</DropdownMenu>
</Dropdown>
</NavbarContent>
<NavbarMenu>
{searchInput}
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