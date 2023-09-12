// models/Slider.js
const mongoose = require('mongoose');

const appDataSchema = new mongoose.Schema({
  sliders: [
    {
      name: String,
      image: String,
      link: String,
    },
  ],
  appName: String,
});

module.exports = mongoose.model('AppData', appDataSchema);
