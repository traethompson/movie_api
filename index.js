const bodyParser = require("body-parser"),
  express = require("express"),
  morgan = require("morgan"),
  uuid = require("uuid"),
  app = express();

const cors = require("cors");
app.use(cors());

const {check, validationResult} = require("express-validator");

app.use(bodyParser.urlencoded({ extended: true }));
let auth = require("./auth.js")(app);
const passport = require("passport");
require("./passport");

const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

// mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect(process.env.CONNECTION_URI, {useNewUrlParser: true, useUnifiedTopology: true});

//add morgan logging, error handling, and page requests
app.use(morgan("common"));

app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong.");
});

app.get("/", (req, res) => {
  res.send("This is the landing page for my movie API.");
});

app.get("/movies", passport.authenticate("jwt", { session: false }), (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.use(express.static("public"));

//Get movie by title (READ)
app.get("/movies/:Title", passport.authenticate("jwt", { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      res.status(500).send("Error: " + err);
    });
});

//get director profile (READ)
app.get("/movies/director/:directorName", passport.authenticate("jwt", { session: false }), (req, res) => {
  Movies.Director.findOne({ Name: req.params.Name })
    .then((director) => {
      res.json(director);
    })
    .catch((err) => {
      res.status(500).send("Error: " + err);
    });
});

//find user by name
app.get("/users/:Username", passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//return all users
app.get("/users", passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Add a user
/* We’ll expect JSON in this format
{
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post("/users", [
  check ("Username", "Username is required").isLength({min: 5}),
  check("Username", "Username contains non alphanumeric characters - not allowed.").isAlphanumeric(),
  check ("Password", "Password is required").not().isEmpty(),
  check ("Email", "Email does not appear to be valid").isEmail()
],(req, res) => {
  let errors = validationResult(req);
  if (errors.isEmpty()){
    return res.status(422).json({errors: errors.array()});
  }
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//update Username (UPDATE)
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put("/users/:Username", passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//add favorite movie (UPDATE)
app.post("/users/:Username/movies/:MovieID", passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { Favorites: req.params.MovieID },
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//delete favorite movie
app.delete("/users/:Username/movies/:MovieID", passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOneAndRemove(
    { Username: req.params.Username },
    {
      $pull: { Favorites: req.params.MovieID },
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//delete user
app.delete("/users/:Username", passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//designate port

const port = process.env.PORT || 8080
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on port "+ port);
});
