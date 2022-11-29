const bodyParser = require("body-parser"),
  express = require("express"),
  morgan = require("morgan"),
  uuid = require("uuid"),
  app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/test",{useNewUrlParser: true, useUnifiedTopology: true});


let users = [
  {
    "id": 1,
    "Name": "Jason",
    "favorites": ["City of Ember"],
  },
  {
    "id": 2,
    "Name": "Brent",
    "favorites": ["The Hitchiker's Guide to the Galaxy"],
  },
  {
    "id": 3,
    "Name": "Melissa",
    "favorites": ["Treasure Planet"],
  }
];
let movieList = [
  {
    "title": "I,Robot",
    "description":
      "In 2035, highly intelligent robots fill public service positions throughout the world, operating under three rules to keep humans safe. Despite his dark history with robotics, Detective Del Spooner (Will Smith) investigates the alleged suicide of U.S. Robotics founder Alfred Lanning (James Cromwell) and believes that a human-like robot (Alan Tudyk) murdered him. With the help of a robot expert (Bridget Moynahan), Spooner discovers a conspiracy that may enslave the human race.",
    "director": {
      "Name": "Alex Proyas",
      "bio": "Alexander Proyas is an Australian filmmaker of Greek descent. Proyas is best known for directing the films The Crow, Dark City, I, Robot, Knowing, and Gods of Egypt.",
      "born": 1963
    }
  },
  {
    "title": "Planet of the Apes",
    "description":
      "Astronaut Leo Davidson whips through space and time to a world where apes and gorillas rule the humans. Captured, he is nurtured by Ari and hunted by General Thade as he leads a rebel group of humans and chimpanzees in search of his downed craft. This is his only hope of escape and, ironically, the planet's only hope of shaking off the tyranny of the gorillas, allowing peaceful humans and chimpanzees to co-exist.",
    "director": {
      "Name": "Tim Burton",
      "bio": "Timothy Walter Burton is an American filmmaker and artist. He is known for his gothic fantasy and horror films such as Beetlejuice, Edward Scissorhands, The Nightmare Before Christmas, Ed Wood, Sleepy Hollow, Corpse Bride, Sweeney Todd: The Demon Barber of Fleet Street, and Dark Shadows.",
      "born": 1958
    }
  },
  {
    "title": "City of Ember",
    "description":
      "For generations a massive generator has sustained the needs of the underground city of Ember. But the generator was built to last only 200 years, and as its lights start to flicker and fade, it remains to two youths, Lina Mayfleet (Saoirse Ronan) and Doon Harrow (Harry Treadaway), to follow a cryptic series of clues that will restore light to to the place.",
    "director": {
      "Name": "Gil Kenan",
      "bio": "Gil Kenan is a British–American film director, film producer, screenwriter, and animator.",
      "born": 1976
    }
  },
  {
    "title": "Astroboy",
    "description":
      "In futuristic Metro City, a brilliant scientist named Tenma builds Astro Boy (Freddie Highmore), a robotic child with superstrength, X-ray vision and the ability to fly. Astro Boy sets out to explore the world and find acceptance, learning what being human is all about in the process. Finding that his friends and family in Metro City are in danger, he uses his incredible powers to save all that he loves.",
    "director": {
      "Name": "David Bowers",
      "bio": "David Bowers is an English animator, film director, screenwriter and voice actor.",
      "born": 1970
    }
  },
  {
    "title": "Men in Black",
    "description":
      "They are the best-kept secret in the universe. Working for a highly funded yet unofficial government agency, Kay (Tommy Lee Jones) and Jay (Will Smith) are the Men in Black, providers of immigration services and regulators of all things alien on Earth. While investigating a series of unregistered close encounters, the MIB agents uncover the deadly plot of an intergalactic terrorist who is on a mission to assassinate two ambassadors from opposing galaxies currently in residence in New York City.",
    "director": {
      "Name": "Barry Sonnenfeld",
      "bio": "Barry Sonnenfeld is an American filmmaker and television director. He originally worked as a cinematographer for the Coen brothers before directing films such as The Addams Family and its sequel Addams Family Values, Get Shorty, the Men in Black trilogy, and Wild Wild West.",
      "born": 1953
    }
  },
  {
    "title": " The Book of Eli",
    "description":
      "Thirty years after war turned the world into a wasteland, a lone warrior named Eli (Denzel Washington) marches across the ruined landscape, carrying hope for humanity's redemption. Only one other man (Gary Oldman) understands the power of what Eli carries, and he is determined to take it for himself. Though Eli prefers peace, he will risk death to protect his precious cargo, for he must fulfill his destiny to help restore mankind.",
    "director": {
      "Name": "Albert Hughes and Allen Hughes",
      "bio": "Albert Hughes and Allen Hughes (born April 1, 1972), known together professionally as the Hughes brothers, are American film directors and producers. The pair, who are twins,[1] are known for co-directing visceral, and often violent, movies, including 1993s Menace II Society, 1995s Dead Presidents, 2001s From Hell and 2010's The Book of Eli.",
      "born": 1972
    }
  },
  {
    "title": "Inception",
    "description":
      "Dom Cobb (Leonardo DiCaprio) is a thief with the rare ability to enter people's dreams and steal their secrets from their subconscious. His skill has made him a hot commodity in the world of corporate espionage but has also cost him everything he loves. Cobb gets a chance at redemption when he is offered a seemingly impossible task: Plant an idea in someone's mind. If he succeeds, it will be the perfect crime, but a dangerous enemy anticipates Cobb's every move.",
    "director": {
      "Name": "Christopher Nolan",
      "bio": "Christopher Nolan CBE is a British-American film director, producer, and screenwriter. His films have grossed more than US$ 5.7 billion worldwide and have garnered 11 Academy Awards from 36 nominations.",
      "born": 1970
    }
  },
  {
    "title": "Ender's Game",
    "description":
      "When hostile aliens called the Formics attack Earth, only the legendary heroics of Mazer Rackham (Ben Kingsley) manage to attain a victory. To prepare for the next attack, Col. Hyrum Graff (Harrison Ford) and his cohorts initiate a military program to find the next Mazer. Recruit Ender Wiggin (Asa Butterfield) exhibits an unusual gift for the training, easily mastering all of the challenges thrown at him. Mazer Rackham, himself, takes Ender as a protege to prepare him for the oncoming war.",
    "director": {
      "Name": "Gavin Hood",
      "bio": "Gavin Hood is a South African filmmaker, and actor, best known for writing and directing Tsotsi, which won the Academy Award for Best Foreign Language Film. He also directed the films X-Men Origins: Wolverine, Ender's Game, Eye in the Sky and most recently, Official Secrets.",
      "born": 1963
    }
  },
  {
    "title": "The Hitchiker's Guide to the Galaxy",
    "description":
      "Arthur Dent (Martin Freeman) is trying to prevent his house from being bulldozed when his friend Ford Prefect (Mos Def) whisks him into outer space. It turns out Ford is an alien who has just saved Arthur from Earth's total annihilation. Ford introduces Arthur to his myriad friends, including many-headed President Zaphod Beeblebrox (Sam Rockwell) and sexy refugee Trillian (Zooey Deschanel). Arthur makes his way across the stars while seeking the meaning of life, or something close to it.",
    "director": {
      "Name": "Garth Jennings",
      "bio": "Garth Jennings is an English director, screenwriter and actor. Films he has directed include The Hitchhiker's Guide to the Galaxy, Son of Rambow, Sing, and Sing 2. He co-founded the production company Hammer & Tongs.",
      "born": 1972
    }
  },
  {
    "title": "Treasure Planet",
    "description":
      "The legendary loot of a thousand worlds inspires an intergalactic treasure hunt when 15-year-old Jim Hawkins stumbles upon a map to the greatest pirate trove in the universe in Walt Disney Pictures' thrilling animated space adventure, Treasure Planet.",
    "director": [
      {
        "Name": "Ron Clements",
        "bio": "Ronald Francis Clements (born April 25, 1953) is an American animator, film director, screenwriter, and film producer. He often collaborates with fellow director John Musker and is best known for writing and directing the Disney films The Great Mouse Detective (1986), The Little Mermaid (1989), Aladdin (1992), Hercules (1997), Treasure Planet (2002), The Princess and the Frog (2009), and Moana (2016).",
        "born": 1953
      },
      {
        "Name": "John Musker",
        "bio": "John Edward Musker (born November 8, 1953) is an American animator, film director, screenwriter, and film producer. He often collaborates with fellow director Ron Clements and is best known for writing and directing the Disney films The Great Mouse Detective (1986), The Little Mermaid (1989), Aladdin (1992), Hercules (1997), Treasure Planet (2002), The Princess and the Frog (2009), and Moana (2016).",
        "born": 1953
      }
    ],
  },
];

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

app.get("/movies", (req, res) => {
  Movies.find()
    .then((movies) =>{
      res.status(201).json(movies);
    })
    .catch((err)=>{
      console.error(err);
      res.status(500).send("Error: " + err);
    })
});

app.use(express.static("public"));

//Get movie by title (READ)
app.get("/movies/:Title", (req, res) => {
  Movies.findOne({Title: req.params.Title})
  .then((movie)=>{
    res.json(movie);
  })
  .catch((err)=>{
    res.status(500).send("Error: " + err);
  })
});

//get director profile (READ)
app.get("/movies/director/:directorName", (req, res) => {
  Directors.findOne({Name: req.params.Name})
    .then((director)=>{
      res.json(director);
    })
    .catch((err)=>{
      res.status(500).send("Error: " + err);
    })
});

//find user by name
app.get('/users/:Name', (req, res) => {
  Users.findOne({ Name: req.params.Name })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//return all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Add a user
/* We’ll expect JSON in this format
{
  Name: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', (req, res) => {
  Users.findOne({ Name: req.body.Name })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Name + 'already exists');
      } else {
        Users
          .create({
            Name: req.body.Name,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//update Name (UPDATE)
/* We’ll expect JSON in this format
{
  Name: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Name', (req, res) => {
  Users.findOneAndUpdate({ Name: req.params.Name }, { $set:
    {
      Name: req.body.Name,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//add favorite movie (UPDATE)
app.post('/users/:Name/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Name: req.params.Name }, {
     $push: { Favorites: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//delete favorite movie
app.delete('/users/:Name/movies/:MovieID', (req, res) => {
  Users.findOneAndRemove({ Name: req.params.Name }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//delete user
app.delete('/users/:Name', (req, res) => {
  Users.findOneAndRemove({ Name: req.params.Name })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Name + ' was not found');
      } else {
        res.status(200).send(req.params.Name + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//designate port

app.listen(8080, () => {
  console.log("Listening on port 8080.");
});
