import fs from "fs";
import path from "path";
import { parseCsvToJson } from "../app.js";

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