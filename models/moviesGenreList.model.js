import fs from "fs";
import path from "path";
import { parseCsvToJson } from "../app.js";

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