import { Slider } from "@/components/slider";
import React from 'react';
import MovieCollection from "@/components/movie-collection";
import { fetchAppData , fetchMovies} from "../api";
import { MovieModel } from "@/models/movieModel"


export default async function Home() {

	const appData = await fetchAppData(); 
	const slidersData  = appData.sliders
	const moviesData: MovieModel[] = await fetchMovies(null);	
	
	
	return (
	  <section className="md:py-4">
		<main>
		  {/* Pass the appData to the Slider component */}
		  {slidersData && <Slider sliderData={slidersData} />}
		  

		 	 <div className='p-1 mb-10 md:px-1'>
				{moviesData.length > 0 && <MovieCollection results={moviesData} title={"Popular Movies"} />}
            </div>

			<div className='p-1 mb-10 md:px-1'>
				{moviesData.length > 0 && <MovieCollection results={moviesData.filter(movie => movie.genres.includes("Action"))} title={"Action Movies"} />}
            </div>	

			<div className='p-1 mb-10 md:px-1'>
				{moviesData.length > 0 && <MovieCollection results={moviesData.filter(movie => movie.genres.includes("Horror"))} title={"Horror Movies"} />}
            </div>	

			<div className='p-1 mb-10 md:px-1'>
				{moviesData.length > 0 && <MovieCollection results={moviesData.filter(movie => movie.genres.includes("Romance"))} title={"Romance Movies"} />}
            </div>

			<div className='p-1 mb-10 md:px-1'>
				{moviesData.length > 0 && <MovieCollection results={moviesData.filter(movie => movie.genres.includes("Comedy"))} title={"Comedy Movies"} />}
            </div>	

			<div className='p-1 mb-10 md:px-1'>
				{moviesData.length > 0 && <MovieCollection results={moviesData.filter(movie => movie.genres.includes("Crime"))} title={"Crime Movies"} />}
            </div>	

			<div className='p-1 mb-10 md:px-1'>
				{moviesData.length > 0 && <MovieCollection results={moviesData.filter(movie => movie.genres.includes("Drama"))} title={"Drama Movies"} />}
            </div>	


		</main>
	  </section>
	);
}
