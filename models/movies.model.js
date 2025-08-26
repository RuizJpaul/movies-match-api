import fs from "fs";
import path from "path";
import { parseCsvToJson } from "../app.js";

export function movies() {
    const filePath = path.join(process.cwd(), "./data/movies.csv");
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return parseCsvToJson(data);
    } catch (err) {
        console.error("Error reading movie data: ", err);
        return [];
    }
}

export function MoviesCount() {
    const filePath = path.join(process.cwd(), "./data/movies.csv");
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return parseCsvToJson(data).length;
    } catch (err) {
        console.error("Error reading movie data: ", err);
        return [];
    }
}

export function MovieById(req) {
    const filePath = path.join(process.cwd(), "./data/movies.csv");
    const id = req.params.id;
    try {
        const data = fs.readFileSync(filePath, "utf8");
        const movies = parseCsvToJson(data);
        const catchedMovie = movies.find((element) => element.id===id);
        if (!catchedMovie) {
            return ({
                msg:"No se encontro ninguna pelicula"
            })
        }
        return catchedMovie;
    } catch (err) {
        console.error("Error reading movie data: ", err);
        return [];
    }
}

export function MovieByYear(req) {
    const year = req.params.year;
    const filePath = path.join(process.cwd(), "./data/movies.csv");
    try {
        const data = fs.readFileSync(filePath, "utf8");
        const movies = parseCsvToJson(data);

        const catchedMovie = movies.find((movie) => movie.year === year);
        if(!catchedMovie) {
            return({
                msg: "No se encontro una pelicula con ese año"
            })
        }
        return catchedMovie;
    } catch (err) {
        console.error("Error reading movie data: ", err);
        return [];
    }
}

export function MoviesByGenre(req) {
    const filePath = path.join(process.cwd(), "./data/movies.csv");
    const genre = req.params.genre;
    try {
        const data = fs.readFileSync(filePath, "utf8");
        const movies = parseCsvToJson(data);
        const moviesByGenre = movies.map((element) => {
            const genreList = element.genre.split(", ");
            if(genreList.includes(genre)){
                return element;
            }
        });

        const catchedMovies = moviesByGenre.filter((element) => element!=null);
        
        return catchedMovies;
    } catch (err) {
        console.error("Error reading movie data: ", err);
        return [];
    }
}

export function MoviesRatingTop() {
    const filePath = path.join(process.cwd(), "./data/movies.csv");
    try {
        const data = fs.readFileSync(filePath, "utf8");
        const movies = parseCsvToJson(data);
        const ratingTop = movies.filter((movie) => Number(movie.rating) >= 9);
        return ratingTop;
    } catch (err) {
        console.error("Error reading movie data: ", err);
        return [];
    }
}

export function MoviesRatingLow() {
    const filePath = path.join(process.cwd(), "./data/movies.csv");
    try {
        const data = fs.readFileSync(filePath, "utf8");
        const movies = parseCsvToJson(data);
        const ratingTop = movies.filter((movie) => Number(movie.rating) <= 8.5);
        return ratingTop;
    } catch (err) {
        console.error("Error reading movie data: ", err);
        return [];
    }
}

export function MoviesByRange({ fromYear, toYear }) {
    const filePath = path.join(process.cwd(), "./data/movies.csv");

    try {
        const data = fs.readFileSync(filePath, "utf8");
        const movies = parseCsvToJson(data);

        // Convierte los parámetros a número si existen
        const from = fromYear ? parseInt(fromYear, 10) : null;
        const to = toYear ? parseInt(toYear, 10) : null;

        const filteredMovies = movies.filter((movie) => {
            const year = Number(movie.year);
            if (isNaN(year)) return false; // si no tiene año, lo ignoramos

            // Condiciones dinámicas
            if (from !== null && year < from) return false;
            if (to !== null && year > to) return false;

            return true;
        });

        return filteredMovies;
    } catch (err) {
        console.error("Error reading movie data: ", err);
        return [];
    }
}

export function MoviesDirectorList() {
    const filePath = path.join(process.cwd(), "./data/movies.csv");
    try {
        const data = fs.readFileSync(filePath, "utf8");
        const movies = parseCsvToJson(data);
        const allDirectors = []
        movies.map((element) => {
            const directorList = element.director.split(" and ");
            directorList.map((director) => {
                let ans = false;
                if (allDirectors.includes(director)) {
                    ans = true;
                }

                if (!ans) {
                    allDirectors.push(director);
                }
            })
        });

        return allDirectors.sort((a, b) => a.localeCompare(b));
    } catch (err) {
        console.error("Error reading movie data: ", err);
        return [];
    }
}

export function MoviesGenreList() {
    const filePath = path.join(process.cwd(), "./data/movies.csv");
    try {
        const data = fs.readFileSync(filePath, "utf8");
        const movies = parseCsvToJson(data);
        const allGenres = []
        movies.map((element) => {
            const genreList = element.genre.split(", ");
            genreList.map((genre) => {
                let ans = false;
                if (allGenres.includes(genre)) {
                    ans = true;
                }

                if (!ans) {
                    allGenres.push(genre);
                }
            })
        });

        const amountGenre = allGenres.map((genre) => {
            let lot = 0;
            movies.map((movie) => {
                const genreList = movie.genre.split(", ");
                if (genreList.includes(genre)) {
                    lot++;
                }
            })
            return ({
                Genero: genre,
                Cantidad: lot
            })
        })
        return amountGenre;
    } catch (err) {
        console.error("Error reading movie data: ", err);
        return [];
    }
}

export function MoviesPagination(req) {
    const filePath = path.join(process.cwd(), "./data/movies.csv");
    const selectedPage = req.params.page;
    try {
        const data = fs.readFileSync(filePath, "utf8");
        const movies = parseCsvToJson(data);
        const moviesPages = Math.ceil(movies.length / 10);
        let page = [];
        for (let i = 0; i < moviesPages; i++) {
            page[i] = [];
        }

        let i = 1;
        let j = 0;
        movies.map((movie) => {
            if (i <= 10) {
                page[j].push(movie);
                i++;
            }
            if (i == 11) {
                i = 1;
                j++;
            }
        });

        return ([
            {
                "Pagina actual: ": selectedPage,
                "Total de paginas: ": moviesPages,
                "Peliculas mostradas: ": page[selectedPage - 1].length
            }
            , page[selectedPage - 1]
        ])
    } catch (err) {
        console.error("Error reading movie data: ", err);
        return [];
    }
}