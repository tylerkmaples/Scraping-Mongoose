const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UseSchema object (similar to sequilize model)
const ArticleSchema = new Schema({

    // `topic` will take the button the user clikcs and find articles based on that topic
    topic: {
        type: String,
        required: true
    },
    
    // `title` is required and of type String
    title: {
        type: String,
        required: true
    },
    
    // `summary` is required and of type String
    summary: {
        type: String,
        required: true
    },

    // `link` is required and of type String
    link: {
        type: String,
        required: true
    },

    // `picture` is required and of type String
    picture: {
        type: String,
        required: true
    },

    // `saved` defaults to false and is a boolean
    saved : {
        type: Boolean,
        default: false
    },

    // `note` is an object that stores a Note id. 
    // The ref property links the ObjectId to the Note model which allows us to populate the Article with notes.
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

// Creates the model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;