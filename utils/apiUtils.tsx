const apiLink = process.env.API;


export const fetchAppData = async () => {
    try {
      console.log("APP DATA FETCH");
      const response = await fetch(`https://movies-app-server-ypl0.onrender.com/api/v1/movies/fetch`,
       {next: { revalidate: 300 } });
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
          console.log("MOVIES DATA FETCH");
            const response = await fetch(`https://movies-app-server-ypl0.onrender.com/api/v1/movies/movies`, 
            {next: { revalidate: 300 } }
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
          console.log("MOVIES DATA FETCH");
            const response = await fetch(`https://movies-app-server-ypl0.onrender.com/api/v1/movies/movies/${id}`,
            { next: { revalidate: 300 } }
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
      console.log("SEARCH DATA FETCH");
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
  
  export const userLogin = async (email:string, password:string) => {
    try {
      const response = await fetch('https://movies-app-server-ypl0.onrender.com/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': email,
        'password': password,
      }),
    });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error login:', error);
      throw error;
    }
  }; 


  export const userSignup = async (firstName:string, lastName:string, email:string, password:string, profileEmoji:number) => {
    try {
      //get users ip address
      const ipResponse = await fetch('https://api64.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ipAddress = ipData.ip;

      const response = await fetch('https://movies-app-server-ypl0.onrender.com/api/v1/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'password': password,
        'ip': ipAddress,
        'profileEmoji': profileEmoji,
      }),
    });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response;
      return data;
    } catch (error) {
      console.error('Error sign up new user:', error);
      throw error;
    }
  }; 

  export const updateWatchList = async (apiToken: string, movieId: number) => {
    try {
      const response = await fetch(`https://movies-app-server-ypl0.onrender.com/api/v1/users/watch-update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({
          movieIds: [movieId],
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding movies:', error);
      throw error;
    }
  };
  