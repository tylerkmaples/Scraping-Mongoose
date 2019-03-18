const db = require("../models");

module.exports = {
    index: function(req, res) {
        res.render("index");
    }
}