const express = require("express"),
  morgan = require("morgan");
const app = express();

let movieList = [
  {
    title: "I,Robot",
    description:
      "In 2035, highly intelligent robots fill public service positions throughout the world, operating under three rules to keep humans safe. Despite his dark history with robotics, Detective Del Spooner (Will Smith) investigates the alleged suicide of U.S. Robotics founder Alfred Lanning (James Cromwell) and believes that a human-like robot (Alan Tudyk) murdered him. With the help of a robot expert (Bridget Moynahan), Spooner discovers a conspiracy that may enslave the human race.",
  },
  {
    title: "Planet of the Apes",
    description:
      "Astronaut Leo Davidson whips through space and time to a world where apes and gorillas rule the humans. Captured, he is nurtured by Ari and hunted by General Thade as he leads a rebel group of humans and chimpanzees in search of his downed craft. This is his only hope of escape and, ironically, the planet's only hope of shaking off the tyranny of the gorillas, allowing peaceful humans and chimpanzees to co-exist.",
  },
  {
    title: "City of Ember",
    description:
      "For generations a massive generator has sustained the needs of the underground city of Ember. But the generator was built to last only 200 years, and as its lights start to flicker and fade, it remains to two youths, Lina Mayfleet (Saoirse Ronan) and Doon Harrow (Harry Treadaway), to follow a cryptic series of clues that will restore light to to the place.",
  },
  {
    title: "Astroboy",
    description:
      "In futuristic Metro City, a brilliant scientist named Tenma builds Astro Boy (Freddie Highmore), a robotic child with superstrength, X-ray vision and the ability to fly. Astro Boy sets out to explore the world and find acceptance, learning what being human is all about in the process. Finding that his friends and family in Metro City are in danger, he uses his incredible powers to save all that he loves.",
  },
  {
    title: "Men in Black",
    description:
      "They are the best-kept secret in the universe. Working for a highly funded yet unofficial government agency, Kay (Tommy Lee Jones) and Jay (Will Smith) are the Men in Black, providers of immigration services and regulators of all things alien on Earth. While investigating a series of unregistered close encounters, the MIB agents uncover the deadly plot of an intergalactic terrorist who is on a mission to assassinate two ambassadors from opposing galaxies currently in residence in New York City.",
  },
  {
    title: " The Book of Eli",
    description:
      "Thirty years after war turned the world into a wasteland, a lone warrior named Eli (Denzel Washington) marches across the ruined landscape, carrying hope for humanity's redemption. Only one other man (Gary Oldman) understands the power of what Eli carries, and he is determined to take it for himself. Though Eli prefers peace, he will risk death to protect his precious cargo, for he must fulfill his destiny to help restore mankind.",
  },
  {
    title: "Inception",
    description:
      "Dom Cobb (Leonardo DiCaprio) is a thief with the rare ability to enter people's dreams and steal their secrets from their subconscious. His skill has made him a hot commodity in the world of corporate espionage but has also cost him everything he loves. Cobb gets a chance at redemption when he is offered a seemingly impossible task: Plant an idea in someone's mind. If he succeeds, it will be the perfect crime, but a dangerous enemy anticipates Cobb's every move.",
  },
  {
    title: "Ender's Game",
    description:
      "When hostile aliens called the Formics attack Earth, only the legendary heroics of Mazer Rackham (Ben Kingsley) manage to attain a victory. To prepare for the next attack, Col. Hyrum Graff (Harrison Ford) and his cohorts initiate a military program to find the next Mazer. Recruit Ender Wiggin (Asa Butterfield) exhibits an unusual gift for the training, easily mastering all of the challenges thrown at him. Mazer Rackham, himself, takes Ender as a protege to prepare him for the oncoming war.",
  },
  {
    title: "The Hitchiker's Guide to the Galaxy",
    description:
      "Arthur Dent (Martin Freeman) is trying to prevent his house from being bulldozed when his friend Ford Prefect (Mos Def) whisks him into outer space. It turns out Ford is an alien who has just saved Arthur from Earth's total annihilation. Ford introduces Arthur to his myriad friends, including many-headed President Zaphod Beeblebrox (Sam Rockwell) and sexy refugee Trillian (Zooey Deschanel). Arthur makes his way across the stars while seeking the meaning of life, or something close to it.",
  },
  {
    title: "Treasure Planet",
    description:
      "The legendary loot of a thousand worlds inspires an intergalactic treasure hunt when 15-year-old Jim Hawkins stumbles upon a map to the greatest pirate trove in the universe in Walt Disney Pictures' thrilling animated space adventure, Treasure Planet.",
  },
];
//add morgan logging, error handling, and page requests
app.use(morgan("common"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong.");
});

app.get("/", (req, res) => {
  res.send(
    "This is the landing page for my movie API."
  );
});

app.get("/movies", (req, res) => {
  res.json(movieList);
});

app.use(express.static("public"));

//designate port

app.listen(8080, () => {
  console.log("Listening on port 8080.");
});
