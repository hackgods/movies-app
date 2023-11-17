const apiLink = process.env.API;


export const fetchAppData = async () => {
    try {
      const response = await fetch(`https://movies-app-server-ypl0.onrender.com/api/v1/movies/fetch`, {
        cache: 'no-cache'
      });
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
            const response = await fetch(`https://movies-app-server-ypl0.onrender.com/api/v1/movies/movies`, 
            {next: { revalidate: 60 } }
              );
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
            const response = await fetch(`https://movies-app-server-ypl0.onrender.com/api/v1/movies/movies/${id}`,
            { next: { revalidate: 60 } }
              );
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
  
  export const search = async (term:string) => {
    try {
      const response = await fetch(`https://movies-app-server-ypl0.onrender.com/api/v1/movies/search?q=${term}`, 
      { next: { revalidate: 60 } }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error searching:', error);
      throw error;
    }
  }; 