import React from 'react'
import Image from 'next/image';
import "@/styles/globals.css";
import Spotlight, { SpotlightCard } from '../components/spotlight'; // Import Spotlight and SpotlightCard
import { useRouter } from 'next/navigation';



interface Result {
    id: number;
    title: string;
    posterPath: string;
  }

  
  interface MovieTileProps {
    result: Result;
  }

  function MovieTile({ result }: MovieTileProps) {
    const BASE_URL = "https://image.tmdb.org/t/p/original/";
    const router = useRouter();


  return (
    <Spotlight className="group">
  <SpotlightCard>
      {/* Your existing MovieTile content goes here */}
      <div className="flex min-w-[200px] min-h-[130px] md:min-w-[200px] 
      md:min-h-[130px] shadow-2xl rounded-lg overflow-hidden cursor-pointer 
      transition duration-300 z-20" 
      onClick={() => router.push(`/movie/${result.id}`)}>
        <Image
          src={`${BASE_URL}${result.posterPath}`}
          alt='movie'
          width={200}
          height={130}
          className='rounded-lg object-cover'
        />
      </div>
  </SpotlightCard>
</Spotlight>

    
  )
}

export default MovieTile;