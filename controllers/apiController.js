// === Require === //

// Scraping tools: Axios and cheerio
const axios = require("axios");
const cheerio = require("cheerio");

// Require the models folder so Article and Note models are accessible
const db = require("../models");

// Export all functions and require them inside the apiRoutes page.
module.exports = {

    // Scrape ===> grab info from website via axios and storing it into the db
    scrape: function(req, res) {
        const topic = req.params.topic;
        // Use axios to grab the body of the html, then load that into cheerio and save it to $.
        axios.get("http://www.nytimes.com/section/" + topic).then(function(response) {
            const $ = cheerio.load(response.data);

            // Now, grab content from the news page.
            $("div.css-4jyr1y a").each(function(i, element) {
                
                // Save an empty result object to late push to db
                const articleResults = {};

                // Add the title, summary, article url, and image url to articleResults object
                articleResults.topic = topic
                articleResults.title = $(this)
                    .children("h2.e1xfvim30")
                    .text().trim();
                articleResults.summary = $(this)
                    .children("p.e1xfvim31")
                    .text().trim();
                articleResults.link = $(this)
                    .attr("href");
                articleResults.picture = $(this)
                    .find("div.css-79elbk")
                    .children("figure")
                    .children("div")
                    .children("img")
                    .attr("src");
                articleResults.saved = false
                // Create a new Article using the `result` object built from scraping
                db.Article.create(articleResults)
                .then(function (dbArticle) {
                    // View the added results in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
            });
            // once all this is ran, redirect to the index handlebars
            res.redirect('/');
        })
    },







}