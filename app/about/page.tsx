import React from "react";


import { subtitle, title } from "@/components/primitives";

export default function AboutPage() {
	return (
		<div>
			<h1 className={title()}>About</h1>
			<h1 className={subtitle()}>Full stack OTT movies application developed by Saurabh Suresh using React NextJS - NodeJS - Express - Mongo</h1>
		</div>
	);
}
