const express = require("express");
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const router = express.Router();
require("dotenv").config();
const axios = require("axios");
const Movie = require("./models/Movie");
const AppData = require("./models/AppData");

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
        posterPath: posterPath
    });

      console.log(movieData);
      console.log(newMovie);
  
      // Save the movie document
      await newMovie.save();
  
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

  

module.exports = router;