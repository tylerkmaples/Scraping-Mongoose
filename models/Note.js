const mongoose = require("mongoose");

// Save a reference to the Schema constuctor
const Schema = mongoose.Schema;

// USinng the Schema constructor, create a new NoteSchema object
const NoteSchema = new Schema({
    // `title` and `body` are of type String
    title: String,
    body: String        
});

// This creates model from the above schema, using mongoose's model method
const Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;