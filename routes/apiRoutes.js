// Require the apiController so the routes can communicate with the controller.
const apiController = require("../controllers/apiController");

// Export the routes
module.exports = function(app) {
    // Route to scrape whichever topic the user chooses
    app.get("/api/scrape/:topic", apiController.scrape);

    // Route to save any article that was scraped
    app.put("/api/saveArticle", apiController.saveArticle);

    // Route to unsave any article that was saved
    app.put("/api/unsaveArticle", apiController.unsaveArticle);

    // Route to delete all articles from scraped/saved
    app.delete("/api/deleteAll", apiController.deleteAll);

    // === Route to get the notes for the articles and populate it === //
    app.get("/api/notes/:_id", apiController.getNote);

    // // Route to add a note to the article
    app.post("api/articles/:_id", apiController.addNote);

    // // Route to delete a note from an article
    // app.delete("api/note/:id", apiController.deleteNote);
}

