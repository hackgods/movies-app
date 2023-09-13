import React from 'react';

const MovieRating: React.FC<{ rating: number }> = ({ rating }) => {
  const maxRating = 5; // Maximum rating value
  const fullStars = Math.floor(rating); // Number of full stars
  const halfStar = rating - fullStars >= 0.5; // Check if there's a half star
  const emptyStars = maxRating - Math.ceil(rating); // Number of empty stars

  return (
    <div className="flex space-x-1 py-2">
      {[...Array(fullStars)].map((_, index) => (
        <svg
          key={index}
          className="w-5 h-5 text-yellow-500 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 1l2.4 6.3h6.3l-5 4.8 2.3 6.7-6-4.6-6 4.6 2.3-6.7-5-4.8h6.3z"
          />
        </svg>
      ))}
      {halfStar && (
        <svg
          className="w-5 h-5 text-yellow-500 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 1l2.4 6.3h6.3l-5 4.8 2.3 6.7-6-4.6-6 4.6 2.3-6.7-5-4.8h6.3z"
          />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <svg
          key={index}
          className="w-5 h-5 text-gray-300 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 1l2.4 6.3h6.3l-5 4.8 2.3 6.7-6-4.6-6 4.6 2.3-6.7-5-4.8h6.3z"
          />
        </svg>
      ))}
    </div>
  );
};

export default MovieRating;
