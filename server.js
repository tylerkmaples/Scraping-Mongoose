const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("./models");

// Define the PORT to use
const PORT = 3000;

// Initialize Express
const app = express();

// === Configure Middleware === //

// Set up Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use('/public', express.static('public'));

// === Connect to the Mongo DB === //

// If deployed, use the deployed database. Otherwise, use the local database
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/scraperHeadlines"
mongoose.connect(MONGO_URI, { useNewUrlParser: true });

// === Routes === //

// apiRoutes will hold all of the routes that add/delete info from the mongodb
require("./routes/apiRoutes")(app);

// htmlRoutes will hold all of the routes that grab info from mongodb and pass into handlebars
require("./routes/htmlRoutes")(app);

// === Server === //
app.listen(PORT, function() {
    console.log(`App is running on port ${PORT}!`);
});