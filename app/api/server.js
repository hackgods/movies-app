const express = require('express');
const movieRoutes = require('./routes/movie.js');

var bodyParser = require('body-parser');
require("dotenv").config();
const cors = require("cors");
const connection = require("./db.js");

//db connection
connection();

const app = express();
const PORT = 4000;
const apiDir = "/api/v1";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: true 
 }));
app.use(cors());



app.use(`${apiDir}/movies`,movieRoutes);


app.listen(PORT,function() {
    console.log(`Server started on ${PORT}`);
});

app.get("/",function(request, response) {
    response.send('Hello, welcome to Movies + Server');
});

app.get(`${apiDir}`,function(request, response) {
    response.send('Hello, welcome to Movies + Server');
});



