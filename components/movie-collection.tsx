import React from 'react'
import MovieTile from './movie-tile'

interface MovieCollectionProps {
    results: any[];
    title: string;
  }

  function MovieCollection({ results, title }: MovieCollectionProps) {

  return (
    <div className="relative flex flex-col space-y-4 my-1 px-1 max-w-[1400px] mx-1">
        <h2 className='text-lg font-semibold'>{title}</h2>
        <div className='flex p-2 -m-2 space-x-6 overflow-x-scroll overflow-y-hidden scrollbar-hide'>
        {results.map((result) => (
            <MovieTile key={result.id} result={result} isFavorite={null}/>
        ))}
        </div>
    </div>
  )
}

  
export default MovieCollection;