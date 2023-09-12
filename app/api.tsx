export const fetchAppData = async () => {
    try {
      const response = await fetch(`${process.env.API}/api/v1/movies/fetch`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching app data:', error);
      throw error;
    }
  };

  export const fetchMovies = async (id: number|null) => {
    if(id==null){
        try {
            const response = await fetch(`${process.env.API}/api/v1/movies/movies`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
          } catch (error) {
            console.error('Error fetching movies data:', error);
            throw error;
          }
    } else {
        try {
            const response = await fetch(`${process.env.API}/api/v1/movies/movies/${id}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
          } catch (error) {
            console.error('Error fetching movies data:', error);
            throw error;
          }
    }
  };  
  