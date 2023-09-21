import React from 'react'
import Image from 'next/image';
import "@/styles/globals.css";
import Spotlight, { SpotlightCard } from '../components/spotlight'; // Import Spotlight and SpotlightCard
import { useRouter } from 'next/navigation';
import { FaPlay, FaPlus, FaCheck} from "react-icons/fa6";



interface Result {
    id: number;
    title: string;
    posterPath: string;
  }

  
  interface MovieTileProps {
    result: Result;
    isFavorite: boolean | null;
  }

  function MovieTile({ result, isFavorite }: MovieTileProps) {
    
    const BASE_URL = "https://image.tmdb.org/t/p/original/";
    const [isHovered, setIsHovered] = React.useState(false);
    const [isFavorited, setIsFavorited] = React.useState(isFavorite);

    const router = useRouter();

    const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); // Prevent the click event from propagating
    
      if (isFavorite === null) {
        return; // Don't perform any action when isFavorite is null
      }

      const id = result.id;
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]') as number[]; // Specify the type as number[]
    
      if (isFavorited) {
        // Remove the movie ID from favorites
        const updatedFavorites = favorites.filter((favId: number) => favId !== id); // Specify the type for favId
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      } else {
        // Add the movie ID to favorites
        favorites.push(id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }

      setIsFavorited(!isFavorited);
    };


  return (
    <Spotlight className="group">
  <SpotlightCard>
      {/* Your existing MovieTile content goes here */}
      <div className="group flex min-w-[200px] min-h-[130px] md:min-w-[200px] 
      md:min-h-[130px] shadow-2xl rounded-lg overflow-hidden cursor-pointer 
      transition duration-300 z-20" 
      onClick={() => router.push(`/movie/${result.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >

        <Image
          src={`${BASE_URL}${result.posterPath}`}
          alt='movie'
          width={350}
          height={130}
          className='rounded-lg object-cover'
        />


      {isHovered && isFavorited !== null && ( // Check isFavorite !== null to render the button
            <button
              className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-opacity-75 bg-white flex items-center justify-center"
              onClick={toggleFavorite}
            >
              {isFavorited ? (
                <FaCheck className="h-6 w-6 text-slate-900 bg-opacity-0" />
              ) : (
                <FaPlus className="h-6 w-6 text-slate-900 bg-opacity-0" />
              )}
            </button>
          )}

      </div>
  </SpotlightCard>
</Spotlight>

    
  )
}

export default MovieTile;