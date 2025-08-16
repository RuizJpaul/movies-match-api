import { Router } from "express";
import { getAllMovies } from "../controllers/getAllMovies.controller.js";
import { getCountMovies } from "../controllers/getCountMovies.controller.js";
import { getRatingTop } from "../controllers/getRatingTop.controller.js";

export const api = Router();

api.get("/movies", getAllMovies);
api.get("/movies/count", getCountMovies);
api.get("/movies/rating-top", getRatingTop);