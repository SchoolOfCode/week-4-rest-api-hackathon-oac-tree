import express from "express";

import {
  getMovies,
  getMovieById,
  getMovieTitle,
  getMoviesByGenre,
  newMovie,
  newKey,
} from "../models/config.js";

const router = express.Router();

//listen for a request
router.get("/", async function (req, res) {
  try {
    // access the database and grab all the movies
    const movieList = await getMovies();
    // return the list of movies with all info
    res.json(movieList);
    console.log("hello");
  } catch (error) {
    // throw error if user is unable to find the database
    res.status(404).json({
      message: error.message,
    });
  }
});

//listen for a request by title
router.get("/search/", async function (req, res) {
  try {
    const { title } = req.query;

    console.log(title);

    const movie = await getMovieTitle(title);
    console.log("hello");

    res.json(movie); // Send the list of movies matching the title
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//listen for a request by id
router.get("/:id", async function (req, res) {
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
      message: error.message,
    });
  }
});

router.get("/search/genre", async function (req, res) {
  try {
    const { genre } = req.query;
    if (genre) {
      return res
        .status(400)
        .json({ message: "Genre query parameter is required" });
    }
    const movies = await getMoviesByGenre(genre);
    if (movies.length === 0) {
      return res.json({ message: "No movies found" });
    }
    res.json(movies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", async function (req, res) {
  try {
    let data = req.body;

    let newEntry = await newMovie(data);

    res.json(newEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async function (req, res) {
  try {
    const id = parseInt(req.params.id);
    let data = req.body;
    let replaceFilm = await newKey(id, data);

    res.json(replaceFilm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
