import fs from "fs";
import path from "path";
import { parseCsvToJson } from "../app.js";

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