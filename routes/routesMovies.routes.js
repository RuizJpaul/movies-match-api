import { Router } from "express";
import { getAllMovies, getMoviesCount, getMovieById, getRatingTop, getRatingLow, getMovieByYear, getMoviesByGenre, getMoviesGenreList, getMoviesDirectorList, getMoviesByRange, getMoviesPagination } from "../controllers/movies.controller.js";

export const api = Router();

//GET
api.get("/movies", getAllMovies);
api.get("/movies/count", getMoviesCount);
api.get("/movies/:id", getMovieById);
api.get("/movies/rating/top", getRatingTop);
api.get("/movies/rating/low", getRatingLow);
api.get("/movies/year/:year", getMovieByYear);
api.get("/movies/genre/list", getMoviesGenreList)
api.get("/movies/genre/:genre", getMoviesByGenre);
api.get("/movies/director/list", getMoviesDirectorList)
api.get("/range", getMoviesByRange)
api.get("/movies/pages/:page", getMoviesPagination);

//POST
