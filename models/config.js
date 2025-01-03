import { data } from "../database.js";

export async function getMovies() {
  return data;
}

export async function getMovieById(id) {
  try {
    const movie = data.find((movie) => movie.id === id);
    if (!movie) {
      throw new Error("Movie not found");
    }
    return movie;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function newKey(filmId, filmReplacement) {
  // Finds the film
  const foundFilm = await getMovieById(filmId);
  // Finds index of film
  const index = data.findIndex((film) => film.id === filmId);

  // spread operator to maintain same id for replaced film
  const newFilm = { ...filmReplacement, id: filmId };

  // replace the old film with the updated one
  data[index] = newFilm;
}

export async function getMovieTitle(search) {
  const lowercased = search.toLowerCase();
  return data.filter(({ title }) => {
    return title.toLowerCase().includes(lowercased);
  });
}

export async function getMoviesByGenre(search) {
  const lowercase = search.toLowerCase();
  return data.filter(({ genre }) => {
    return genre.toLowerCase().includes(lowercase);
  });
}

export async function newMovie(newFilm) {
  data.push(newFilm);

  return newFilm;
}
