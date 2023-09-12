const express = require("express");
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const router = express.Router();
require("dotenv").config();
const axios = require("axios");
const Movie = require("./models/Movie");
const AppData = require("./models/AppData");
const youtubedl = require('youtube-dl-exec')


const apiKey = process.env.KEY; // TMDB API key



//home of movies api
router.get("/", (req, res) => {
    res.send("Hello -User");
});



// Add a new movie
router.post("/add-movie", async (req, res) => {
    try {
      const { tmdbMovieId, videoUrl } = req.body;
  
      // Fetch movie data from TMDB API
      const tmdbMovieUrl = `https://api.themoviedb.org/3/movie/${tmdbMovieId}?api_key=${apiKey}&language=en-US`;
  
      const response = await axios.get(tmdbMovieUrl);
      const movieData = response.data;
  
      const tmdbImagesUrl = `https://api.themoviedb.org/3/movie/${tmdbMovieId}/images?api_key=${apiKey}`;
      const imagesResponse = await axios.get(tmdbImagesUrl);
      const imagesData = imagesResponse.data;
      
    
      // Extract the file_path of the first poster (if available)
        let posterPath = null;
        if (imagesData.posters && imagesData.posters.length > 0) {
         posterPath = imagesData.posters[0].file_path;
            }

            //Get the yt trailer of the movie
            const tmdbVideosUrl = `https://api.themoviedb.org/3/movie/${tmdbMovieId}/videos?api_key=${apiKey}`;
            const videosResponse = await axios.get(tmdbVideosUrl);
      
            const results = videosResponse.data.results.filter(item => {
            const lowerCaseName = item.name.toLowerCase();
            
            return (
                item.type === "Trailer" &&
                (lowerCaseName.includes("official trailer") || lowerCaseName.includes("main trailer")) &&
                lowerCaseName.split(" ").length < 5
              );
             
          });

      
            const ytId = results[0]['key'];
            console.log(`working id: ${ytId}`);

            const ytvideoLink = await getYtVideo(ytId);
            console.log(`working link: ${ytvideoLink}`);
  


      // Create a new movie document in MongoDB
      const newMovie = new Movie({
        id: tmdbMovieId,
        videoUrl,
        title: movieData.title,
        backdropPath: movieData.backdrop_path,
        overview: movieData.overview,
        genres: movieData.genres.map((genre) => genre.name), // Extract genre names
        homepage: movieData.homepage,
        popularity: movieData.popularity,
        productionCompanies: movieData.production_companies.map((company) => company.name), // Extract company names
        productionCountries: movieData.production_countries.map((country) => country.name), // Extract country names
        revenue: movieData.budget, // Assuming budget corresponds to revenue
        runtime: movieData.runtime,
        spokenLanguages: movieData.spoken_languages.map((language) => language.english_name), // Extract English language names
        status: movieData.status,
        tagline: movieData.tagline,
        voteAverage: movieData.vote_average,
        voteCount: movieData.vote_count,
        posterPath: posterPath,
        ytLink: ytvideoLink,
        ytID: ytId
    });

    
  
      // Save the movie document
      await newMovie.save();
      console.log(`working movie added`);
  
      res.status(201).json({ message: "Movie added successfully", movie: newMovie });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });


// Add a new slider to the appData collection
router.post('/add-slider', async (req, res) => {
    try {
      const { name, image, link } = req.body;
  
      // Create a new slider object
      const newSlider = {
        name,
        image,
        link,
      };
  
      // Find the appData document (assuming there's only one document)
      let appData = await AppData.findOne();
  
      // If no appData document exists, create one
      if (!appData) {
        appData = new AppData({
          sliders: [],
        });
      }
  
      // Add the new slider to the sliders array
      appData.sliders.push(newSlider);
  
      // Save the updated appData document
      await appData.save();
  
      res.status(201).json({ message: 'Slider added successfully', slider: newSlider });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


// Fetch specified field or the entire appData document
router.get("/fetch", async (req, res) => {
    try {
      // For example, you might use an ID or some other unique identifier
      const appDataDocument = await AppData.findOne();
  
      if (!appDataDocument) {
        return res.status(404).json({ error: "AppData not found" });
      }
  
      // Extract the field name from the query parameters
      const fieldName = req.query.fieldName;
  
      // If a field name is specified, return only that field, otherwise return the entire document
      if (fieldName) {
        // Check if the specified field exists in the document
        if (appDataDocument[fieldName] !== undefined) {
          const fieldValue = appDataDocument[fieldName];
          return res.status(200).json({ [fieldName]: fieldValue });
        } else {
          return res.status(400).json({ error: "Field not found in the document" });
        }
      } else {
        // No field name specified, return the entire document
        return res.status(200).json(appDataDocument);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  
// Define a route to fetch all movies
router.get("/movies", async (req, res) => {
    try {
      // Use the Movie model to query the database for all movies
      const movies = await Movie.find();
  
      // Send the list of movies as a JSON response
      res.json(movies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

// Define a route to fetch movie details by ID
router.get("/movies/:id", async (req, res) => {
    try {
      const movieId = req.params.id;
  
      // Use the Movie model to find a movie by ID in the database
      const movie = await Movie.findOne({ id: movieId }).exec();
  
      if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
      }
  
      // Send the movie details as a JSON response
      res.json(movie);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }); 

// Define a route to fetch youtube video link

router.get("/youtube/:id", async (req, res) => {
  try {
    // Get the YouTube video ID from the query parameters
    const videoId = req.params.id;
    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }

    const link = getYtVideo(videoId);
    
    res.json(link);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get("/debug", async (req, res) => {
  try {
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


async function getYtVideo(id) {
  return new Promise((resolve, reject) => {
    const videoUrl = `http://www.youtube.com/watch?v=${id}`;

    youtubedl(videoUrl, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: [
        'referer:youtube.com',
        'user-agent:googlebot'
      ]
    }).then(output => {
      const desiredFormatId = "137"; // Convert it to a string since "format_id" is a string in your JSON
      const format = output.formats.find(item => item.format_id === desiredFormatId);

      if (format) {
        // Resolve with the URL when found
        console.log(`${format['url']}`);
        resolve(format['url']);
      } else {
        // Reject with an error when format is not found
        reject(new Error("Format not found"));
      }
    }).catch(error => {
      // Reject with an error if there's any problem
      reject(error);
    });
  });
}


module.exports = router;