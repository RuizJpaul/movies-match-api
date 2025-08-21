import { MovieById } from "../models/movieById.model.js";
import { movies } from "../models/movies.model.js";
import { MoviesCount } from "../models/moviesCount.model.js";
import { MoviesRatingTop } from "../models/moviesRatingTop.model.js";
import { MoviesRatingLow } from "../models/moviesRatingLow.model.js";
import { MovieByYear } from "../models/movieByYear.model.js";

export function getAllMovies(req, res) {
    const allMovies = movies();
    res.json(allMovies);
}

export function getMoviesCount(req, res) {
    const moviesCount = MoviesCount();
    res.json({
        msg: "Cantidad toal de peliculas: " + moviesCount
    });
}

export function getMovieById(req, res){
    const movieById = MovieById(req);
    res.json(movieById);
}

export function getRatingTop(req, res) {
    const moviesRatingTop = MoviesRatingTop();
    res.json(moviesRatingTop);
}

export function getRatingLow(req, res) {
    const moviesRatingLow = MoviesRatingLow();
    res.json(moviesRatingLow);
}

export function getMovieByYear(req, res) {
    const movieByYear = MovieByYear(req);
    res.json(movieByYear);
}

