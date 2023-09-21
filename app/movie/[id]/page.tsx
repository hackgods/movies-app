"use client"
import MovieTile from '@/components/movie-tile'
import {fetchMovies} from "../../api";
import React, { useEffect, useState, Context } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Head from 'next/head';
import "@/styles/globals.css";
import { FaPlay, FaPlus, FaCheck} from "react-icons/fa6";
import {Button} from "@nextui-org/react";
import {Chip} from "@nextui-org/react";
import { Rating } from 'react-simple-star-rating'
import MovieRating from '@/components/ratingstars';
import Link from 'next/link'


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
  const [isFavorite, setIsFavorite] = useState(false); // State variable for favorite
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = Number(params['id']);
        const moviesdata = await fetchMovies(id);
        setMoviesData(moviesdata);

        // Check if the movie ID is in localStorage
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.includes(id));
        
        console.log("Fetched movie");
        console.log(moviesdata);
      } catch (error) {
      }
    };

    fetchData();
  }, []);


      const rating10 = moviesData?.voteAverage || 0;
      const rating5 = rating10 / 2;
      const roundedRating = Math.round(rating5 * 2) / 2;


const toggleFavorite = () => {
  const id = Number(params['id']);
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]') as number[]; // Specify the type as number[]

  if (isFavorite) {
    // Remove the movie ID from favorites
    const updatedFavorites = favorites.filter((favId: number) => favId !== id); // Specify the type for favId
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  } else {
    // Add the movie ID to favorites
    favorites.push(id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  setIsFavorite(!isFavorite);
};


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
            controls={false}
            className="absolute inset-0 w-full h-full object-cover transform scale-[1.35]"
          ></video>
          {/* Content over the video */}
          
          <div className="absolute bottom-10 left-0 right-0 z-50 p-4 mb-20">
  <div className="backdrop-blur-3xl rounded-[30px] p-4 inline-block bg-stone-600  bg-opacity-30">
    <h1 className="sm:text-2xl md:text-3xl lg:text-3xl font-bold text-white pb-4">
      {moviesData ? moviesData.title : ''}
    </h1>

    <div className="flex gap-4">
    <MovieRating rating={moviesData ? roundedRating : 0} /> 
          {moviesData &&
             moviesData.genres.slice(0, 2).map((genre, index) => (
             <Chip key={index} radius="full" className='bg-stone-600 bg-opacity-30'>
                 {genre}
             </Chip>
  ))}

    </div>  
    
    <h1 className="sm:text-base md:text-base lg:text-lg font-light text-white pb-4 pt-4">
      {moviesData ? moviesData.overview : ''}
    </h1>

    <Link 
    href={{
      pathname : `/watch/${moviesData ? moviesData.id : ''}`,
      query: { moviesData: JSON.stringify(moviesData) },
    }}
    >
    <Button
  className='bg-zinc-50 text-zinc-900 font-bold'
  startContent={<FaPlay />}>
  Watch
</Button> </Link>

  <Button
    variant="bordered"
    className='border-zinc-50 font-bold mx-4'
    onClick={toggleFavorite}>
            {isFavorite ? <FaCheck /> : <FaPlus />}
  </Button>
  </div>
</div>


        </div>
      );
    }

export default Movie;