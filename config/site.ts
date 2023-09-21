export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Movies +",
	description: "Watch movies",
	navItems: [
		{
			label: "Home",
			href: "/",
		},

    {
      label: "My List",
      href: "/favourites",
    },
    {
      label: "About",
      href: "/about",
    }
	],
	navMenuItems: [
		{
			label: "Home",
			href: "/",
		},

    {
      label: "My List",
      href: "/favourites",
    },
    {
      label: "About",
      href: "/about",
    },
	{
		label: "Logout",
		href: "/logout",
		},
	],
	links: {
		github: "https://github.com/hackgods",
		linkedin: "https://linkedin.com/in/hackgod",
		
	},
};
