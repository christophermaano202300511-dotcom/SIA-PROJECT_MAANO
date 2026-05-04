const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Sample music database
const songs = {
  pop: [
    "Taylor Swift - Shake It Off",
    "Dua Lipa - Levitating",
    "Ed Sheeran - Shape of You"
  ],
  rock: [
    "Linkin Park - Numb",
    "Queen - Bohemian Rhapsody",
    "Imagine Dragons - Believer"
  ],
  rap: [
    "Eminem - Lose Yourself",
    "Drake - God's Plan",
    "Kendrick Lamar - HUMBLE."
  ],
  chill: [
    "Joji - Slow Dancing in the Dark",
    "The Weeknd - Call Out My Name",
    "Billie Eilish - ocean eyes"
  ]
};

// GET all genres
app.get("/genres", (req, res) => {
  res.json(Object.keys(songs));
});

// GET songs by genre
app.get("/recommend/:genre", (req, res) => {
  const genre = req.params.genre.toLowerCase();

  if (!songs[genre]) {
    return res.status(404).json({
      message: "Genre not found",
      availableGenres: Object.keys(songs)
    });
  }

  res.json({
    genre,
    recommendations: songs[genre]
  });
});

// Random recommendation
app.get("/random", (req, res) => {
  const genres = Object.keys(songs);
  const randomGenre = genres[Math.floor(Math.random() * genres.length)];
  const list = songs[randomGenre];
  const randomSong = list[Math.floor(Math.random() * list.length)];

  res.json({
    genre: randomGenre,
    song: randomSong
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Music recommendation API running on http://localhost:${PORT}`);
});