import { data } from "./database.js";

export async function getMovies() {
  return data;
}

export async function getMovieById(id) {
  try {
    const movie = data.find(movie => movie.id === id);
    if (!movie) {
      throw new Error("Movie not found");
    }
    return movie;
  } catch (error) {
    throw new Error(error.message);
  }
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