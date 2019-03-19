const db = require("../models");

module.exports = {
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
    }
}