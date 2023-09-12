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
import MovieCollection from "@/components/movie-collection";
import { fetchAppData , fetchMovies} from "../api";
import Spotlight from "@/components/spotlight";
import { SpotlightCard } from "@/components/spotlight";
import Image from "next/image";

function Home() {
	const [appData, setAppData] = useState(null);
	const [slidersData, setSlidersData] = useState(null);
	const [moviesData, setMoviesData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
		  try {
			const appdata = await fetchAppData();
			setAppData(appdata);
	
			if (appdata && appdata.sliders) {
			  setSlidersData(appdata.sliders);
			}
	
			const moviesdata = await fetchMovies();
			setMoviesData(moviesdata); // Set moviesData when fetching is complete
	
		  } catch (error) {
			// Handle error if needed
		  }
		};
	
		fetchData(); // Call the fetchData function when the component mounts
	  }, []); // Empty dependency array to run only on component mount
	
	console.log(moviesData);

	return (
	  <section className="md:py-4">
		<main>
		  {/* Pass the appData to the Slider component */}
		  {slidersData && <Slider sliderData={slidersData} />}
		  

		  <div className='p-1 md:px-1 mb-10'>
				{moviesData.length > 0 && <MovieCollection results={moviesData} title={"Popular Movies"} />}
            </div>


		</main>
	  </section>
	);
}

export default Home;
