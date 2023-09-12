export const fetchAppData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/movies/fetch');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie data:', error);
      throw error;
    }
  };
  