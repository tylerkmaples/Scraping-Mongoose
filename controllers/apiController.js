// === Require === //

// Scraping tools: Axios and cheerio
const axios = require("axios");
const cheerio = require("cheerio");

// Require the models folder so Article and Note models are accessible
const db = require("../models");

// Export all functions and require them inside the apiRoutes page.
module.exports = {

    // Scrape ===> grab info from website via axios and storing it into the db
    scrape: function (req, res) {
        const topic = req.params.topic;
        // Use axios to grab the body of the html, then load that into cheerio and save it to $.
        axios.get("http://www.nytimes.com/section/" + topic).then(function (response) {
            const $ = cheerio.load(response.data);

            // Now, grab content from the news page.
            $("div.css-4jyr1y a").each(function (i, element) {

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
            res.redirect('/topic/' + topic);
        })
    },
    // === Save Articles/Unsave Articles === //
    saveArticle: function (req, res) {
        console.log(req.body);
        const id = req.body._id;
        db.Article.update({_id: id}, {$set: {saved: true}}, {new: true})
            .then(function(upSave) {
                console.log(upSave);
                res.send(upSave);
            })
            .catch(function(error){
                console.log(error);
            })
    },
    
    // === delete article from saved article and change from true to false for save === //
    unsaveArticle: function(req, res) {
        console.log(req.body);
        const id = req.body._id;
        db.Article.update({_id: id}, {$set: {saved: false}})
            .then(function(upUnsave) {
                console.log(upUnsave);
                res.send(upUnsave);
            })
            .catch(function(error){
                console.log(error);
            })
    },

    // === delete all articles === //
    deleteAll: function(req, res) {
        db.Article.remove({})
        .then(function(clearedArts){
            console.log(clearedArts);
            db.Note.remove({})
            .then(function(clearNotes){
                console.log(clearNotes);
            })
            .catch(function(error){
                console.log(error);
            })
        })
        .catch(function(err){
            console.log(err);
        })
    },

    // === get notes === //
    getNote: (req, res) => {
        const articleId = req.params._id;
        db.Article.findOne({_id: articleId})
        .populate('note')
        .then(notes => {
            res.json(notes);
        })
        .catch(err => {
            if (err) console.log(err);
        });
    },

    // === add note === //
    addNote: function(req, res) {
        // console.log(`*******${req.params._id}**********`);
        // console.log(`**********${req.body.body}***********`)
        const articleId = req.params._id;
        db.Note.create(req.body)
        .then(function(dbNote){
            return db.Article.findOneAndUpdate({ _id: articleId}, {$push: {note: dbNote._id}}, {new: true});
        })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (error){
            res.json(error);
        });
    },

    // === delete note === //
    deleteNote: function(req, res) {







    }
}