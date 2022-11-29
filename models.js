const mongoose = require ("mongoose");

let movieSchema = mongoose.Schema({
    Title: {type: String, requires: true},
    Description: {type: String, required: true},
    Director: {
        Name: String,
        Bio: String
    }
});

let userSchema = mongoose.Schema({
    Name:{type: String, required: true},
    Favorites:[{type: mongoose.Schema.Types.ObjectId, ref: "Movie"}]
});

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;