import { Router } from "express";
import { getAllMovies, getMoviesCount, getMovieById, getRatingTop, getRatingLow, getMovieByYear } from "../controllers/getMovies.controller.js";

export const api = Router();

api.get("/movies", getAllMovies);
api.get("/movies/count", getMoviesCount);
api.get("/movies/:id", getMovieById);
api.get("/movies/rating/top", getRatingTop);
api.get("/movies/rating/low", getRatingLow);
api.get("/movies/year/:year", getMovieByYear);
