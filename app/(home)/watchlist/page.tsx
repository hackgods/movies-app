// "use client"
// import React, { useEffect, useState, Context } from 'react';
// import {fetchMovies} from "../../../utils/apiUtils";
// import MovieTile from '../../../components/movie-tile'
// import { MovieModel } from "@/models/movieModel"

// import { useSession } from "next-auth/react"
// import { redirect } from 'next/navigation';


// function WatchList() {
//     const [watchedMovies, setwatchedMovies] = useState<MovieModel[]>([]);

//     const { data: session, status } = useSession({
//       required: true,
//       onUnauthenticated() {
//         redirect('/login?callbackUrl=/watchlist')
//       }
//     });
    
//     useEffect(() => {
//       const fetchData = async () => {
//         try {


//           //left here last time


          
//           // Check if the movie IDs are in localStorage
//           const favoriteMovieIds = JSON.parse(localStorage.getItem('favorites') || '[]');
  
//           // Fetch movie data for each favorite movie ID
//           const moviePromises = favoriteMovieIds.map(async (id: number) => {
//             const movieData = await fetchMovies(id);
//             return movieData;
//           });
  
//           // Wait for all movie data requests to complete
//           const movies = await Promise.all(moviePromises);
  
//           // Set the fetched movie data in state
//           setwatchedMovies(movies);
//           console.log(movies);

//         } catch (error) {
//           // Handle error if needed
//         }
//       };
  
//       fetchData();
//     }, []);

//   return (
//     <div>
//       <h1 className="py-4 font-bold sm:text-base md:text-base lg:text-lg text-white/75 ">
//       My favourite movies
//     </h1>

//     {watchedMovies.length === 0 ? (
//         <p>No favorite movies found :(</p>
//       ) : (
//         <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
//           {watchedMovies.map((movie: MovieModel) => (
//             <MovieTile key={movie.id} result={movie} isFavorite={localStorage?.getItem('favorites')?.includes(movie.id.toString()) === true} />
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default WatchList