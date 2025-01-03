import express from "express";
import bodyParser from "body-parser";
import { getMovies, getMovieById, getMovieTitle, getMoviesByGenre } from "./config.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(bodyParser.json());

//listen for a request
app.get("/", async function (req, res) {
  try {
    // access the database and grab all the movies
    const movieList = await getMovies();
    // return the list of movies with all info 
    res.json(movieList);
  } catch (error) {
    // throw error if user is unable to find the database
    res.status(404).json({
      message: error.message,
    });
  }
});

//listen for a request by id
app.get("/:id", async function (req, res) {
  try {
    // grab the id from the user query parameter
    const id = parseInt(req.params.id);
    // search and grab the movie based on the id provided
    const movie = await getMovieById(id);
    // return the selected movie
    res.json(movie);
  } catch (error) {
    // throw error if the movie was not found
    res.status(404).json({
      message: error.message
    });
  }
});

//listen for a request by title
app.get("/search/title", async function (req, res) {
  try {
    const { title } = req.query;
    if (!title) {
      return res.status(400).json({ message: "Title query parameter is required" });
    }
    const movie = await getMovieTitle(title);
    if (movie.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie); // Send the list of movies matching the title
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});

app.get("/search/genre", async function(req, res) {
  try {
    const { genre } = req.query;
    if (genre) {
      return res.status(400).json({ message: "Genre query parameter is required"})
    }
    const movies = await getMoviesByGenre(genre);
    if (movies.length === 0) {
      return res.json({ message: "No movies found"});
    }
    res.json(movies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

export default app;
