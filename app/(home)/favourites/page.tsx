"use client"
import React, { useEffect, useState, Context } from 'react';
import {fetchMovies} from "../../api";
import MovieTile from '../../../components/movie-tile'


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

function Favorites() {
    const [favoriteMovies, setFavoriteMovies] = useState<MovieData[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Check if the movie IDs are in localStorage
          const favoriteMovieIds = JSON.parse(localStorage.getItem('favorites') || '[]');
  
          // Fetch movie data for each favorite movie ID
          const moviePromises = favoriteMovieIds.map(async (id: number) => {
            const movieData = await fetchMovies(id);
            return movieData;
          });
  
          // Wait for all movie data requests to complete
          const movies = await Promise.all(moviePromises);
  
          // Set the fetched movie data in state
          setFavoriteMovies(movies);
          console.log(movies);

        } catch (error) {
          // Handle error if needed
        }
      };
  
      fetchData();
    }, []);

  return (
    <div>
      <h1 className="sm:text-base md:text-base lg:text-lg font-bold text-white/75 py-4 ">
      My favourite movies
    </h1>

    {favoriteMovies.length === 0 ? (
        <p>No favorite movies found :(</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favoriteMovies.map((movie: MovieData) => (
            <MovieTile key={movie.id} result={movie} isFavorite={localStorage?.getItem('favorites')?.includes(movie.id.toString()) === true} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites