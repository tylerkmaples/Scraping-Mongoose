// Require the htmlController so the routes can communicate with the controller.
const htmlController = require("../controllers/htmlController");

module.exports = function (app) {
    app.get("/", htmlController.index)
}