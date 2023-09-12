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
        <div className='flex space-x-6 overflow-y-hidden overflow-x-scroll scrollbar-hide p-2 -m-2'>
        {results.map((result) => (
            <MovieTile key={result.id} result={result}/>
        ))}
        </div>
    </div>
  )
}

  
export default MovieCollection;