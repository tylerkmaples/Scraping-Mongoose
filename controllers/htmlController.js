const db = require("../models");

module.exports = {
    // === Default landing page -> will display all articles in db === //
    index: function(req, res) {
        db.Article.find({}, function(error, dbArticle){
            if (error) {
                console.log(error);
            }
            else {
               res.render("index", { articles: dbArticle }); 
               console.log(dbArticle)
            }
        })
    },
    // === Page that displays only a specific topic that user chooses === //
    indexTopic: function(req, res){
        const topic = req.params.topic;
        db.Article.find({topic: topic}, function(error, articleTopic){
            if (error) {
                console.log(error);
            }
            else {
                res.render("index", {articles: articleTopic})
                console.log(articleTopic);
            }
        })
    },
    // === Save Page that displays the save aritcles === //
    savedArticles: function(req, res){
        db.Article.find({saved: true}, function(error, savedArts){
            if (error) {
                console.log(error);
            }
            else {
                res.render("saved", {articles: savedArts})
                console.log(savedArts);
            };
        });
    },
}