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

interface Movie {
	id: number;
	title: string;
	genres: string[];
	posterPath: string;
	voteAverage: number;
	voteCount: number;
	weightedAverage: number
  }

function Home() {
	const [appData, setAppData] = useState(null);
	const [slidersData, setSlidersData] = useState(null);
	const [moviesData, setMoviesData] = useState<Movie[]>([]);

	useEffect(() => {
		const fetchData = async () => {
		  try {
			const appdata = await fetchAppData();
			setAppData(appdata);
	
			if (appdata && appdata.sliders) {
			  setSlidersData(appdata.sliders);
			}
	
			const moviesdata = await fetchMovies(null);
			setMoviesData(moviesdata); // Set moviesData when fetching is complete
	
		  } catch (error) {
			// Handle error if needed
		  }
		};
	
		fetchData(); // Call the fetchData function when the component mounts
	  }, []); // Empty dependency array to run only on component mount
	
	console.log(moviesData);

	const ap = process.env.API
	return (
	  <section className="md:py-4">
		<main>
		  {/* Pass the appData to the Slider component */}
		  {slidersData && <Slider sliderData={slidersData} />}
		  

		 	 <div className='p-1 md:px-1 mb-10'>
				{moviesData.length > 0 && <MovieCollection results={moviesData} title={"Popular Movies"} />}
            </div>

			<div className='p-1 md:px-1 mb-10'>
				{moviesData.length > 0 && <MovieCollection results={moviesData.filter(movie => movie.genres.includes("Action"))} title={"Action Movies"} />}
            </div>	

			<div className='p-1 md:px-1 mb-10'>
				{moviesData.length > 0 && <MovieCollection results={moviesData.filter(movie => movie.genres.includes("Horror"))} title={"Horror Movies"} />}
            </div>	

			<div className='p-1 md:px-1 mb-10'>
				{moviesData.length > 0 && <MovieCollection results={moviesData.filter(movie => movie.genres.includes("Romance"))} title={"Romance Movies"} />}
            </div>

			<div className='p-1 md:px-1 mb-10'>
				{moviesData.length > 0 && <MovieCollection results={moviesData.filter(movie => movie.genres.includes("Comedy"))} title={"Comedy Movies"} />}
            </div>	

			<div className='p-1 md:px-1 mb-10'>
				{moviesData.length > 0 && <MovieCollection results={moviesData.filter(movie => movie.genres.includes("Crime"))} title={"Crime Movies"} />}
            </div>	

			<div className='p-1 md:px-1 mb-10'>
				{moviesData.length > 0 && <MovieCollection results={moviesData.filter(movie => movie.genres.includes("Drama"))} title={"Drama Movies"} />}
            </div>	


		</main>
	  </section>
	);
}

export default Home;
