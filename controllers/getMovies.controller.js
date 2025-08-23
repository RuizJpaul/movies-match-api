import { MovieById } from "../models/movieById.model.js";
import { movies } from "../models/movies.model.js";
import { MoviesCount } from "../models/moviesCount.model.js";
import { MoviesRatingTop } from "../models/moviesRatingTop.model.js";
import { MoviesRatingLow } from "../models/moviesRatingLow.model.js";
import { MovieByYear } from "../models/movieByYear.model.js";
import { MoviesByGenre } from "../models/moviesByGenre.model.js";
import { MoviesGenreList } from "../models/moviesGenreList.model.js";
import { MoviesDirectorList } from "../models/moviesDirectorList.model.js";
import { MoviesByRange } from "../models/moviesByRange.model.js";

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

export function getMoviesByGenre(req, res) {
    const moviesByGenre = MoviesByGenre(req);
    res.json(moviesByGenre);
}

export function getMoviesGenreList(req, res) {
    const moviesGenreList = MoviesGenreList();
    res.json(moviesGenreList);
}

export function getMoviesDirectorList(req, res) {
    const moviesDirectorList = MoviesDirectorList();
    res.json(moviesDirectorList);
}

export function getMoviesByRange(req, res) {
    const moviesByRange = MoviesByRange(req);
    res.json(moviesByRange);
}