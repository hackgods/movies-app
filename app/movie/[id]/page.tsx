"use client"
import MovieTile from '@/components/movie-tile'
import {fetchMovies} from "../../api";
import React, { useEffect, useState, Context } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Head from 'next/head';
import "@/styles/globals.css";

interface MovieData {
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


function Movie() {
  const [moviesData, setMoviesData] = useState<MovieData | null>(null);
  const params = useParams();
  const pathname = usePathname();


    useEffect(() => {
      const fetchData = async () => {
        try {
      
          const id = Number(params['id']);
          const moviesdata = await fetchMovies(id);
          setMoviesData(moviesdata);

          console.log("Fetched movie");
          console.log(moviesdata);
        } catch (error) {
        // Handle error if needed
        }
      };
    
      fetchData(); // Call the fetchData function when the component mounts
      }, []); // Empty dependency array to run only on component mount
    

      return (
        <div className="h-screen relative overflow-hidden">
          <Head>
            <title>{moviesData?.title || 'Loading...'}</title>
          </Head>
          {/* Video element */}
          <video
            src={moviesData?.ytLink}
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover transform scale-150"
          ></video>
          {/* Content over the video */}
          
          <div className="absolute bottom-20 left-4 right-4 sm:absolute sm:bottom-30 sm:left-10 sm:right-10 z-50">
  <div className="backdrop-blur-3xl rounded-[30px] p-4 inline-block bg-stone-600  bg-opacity-30">
    <h1 className="text-4xl font-bold text-white pb-4">
      {moviesData ? moviesData.title : ''}
    </h1>

    <h1 className="text-lg font-light text-white">
      {moviesData ? moviesData.overview : ''}
    </h1>
  </div>
</div>


        </div>
      );
    }

export default Movie;