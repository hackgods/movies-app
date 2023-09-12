"use client"
import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Slider } from "@/components/slider";
import React, { useEffect, useState } from 'react';

import { fetchAppData } from "./api";


function Home() {
	const [movieData, setMovieData] = useState(null);
	const [slidersData, setSlidersData] = useState(null);

	useEffect(() => {
	  const fetchData = async () => {
		try {
		  const data = await fetchAppData();
		  setMovieData(data);
		  if (data && data.sliders) {
			setSlidersData(data.sliders);
		  }
		} catch (error) {
		  // Handle error if needed
		}
	  };
  
	  fetchData(); // Call the fetchData function when the component mounts
	}, []);
  
	return (
	  <section className="flex flex-col items-center justify-center gap-4 py-0 md:py-4">
		<main>
		  {/* Pass the movieData to the Slider component */}
		  {slidersData && <Slider sliderData={slidersData} />}
		</main>
	  </section>
	);
  }
  
  export default Home;