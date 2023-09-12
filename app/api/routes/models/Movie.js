const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  title: String,
  overview: String,
  releaseDate: Date,
  backdropPath: String,
  genres: [String],
  homepage: String,
  imdbId: String,
  originalLanguage: String,
  originalTitle: String,
  popularity: Number,
  posterPath: String,
  productionCompanies: [String],
  productionCountries: [String],
  revenue: Number,
  runtime: Number,
  spokenLanguages: [String],
  status: String,
  voteAverage: Number,
  voteCount: Number
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
