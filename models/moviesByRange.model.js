import fs from "fs";
import path from "path";
import { parseCsvToJson } from "../app.js";

export function MoviesByRange(req) {
    const { fromYear, toYear } = req.query;

    const filePath = path.join(process.cwd(), "./data/movies.csv");
    try {
        const data = fs.readFileSync(filePath, "utf8");
        const movies = parseCsvToJson(data);

        // Convierte los parámetros a número si existen
        const from = fromYear ? parseInt(fromYear, 10) : null;
        const to = toYear ? parseInt(toYear, 10) : null;

        // Filtra por rango de año
        const filteredMovies = movies.map(movie => {
            if(movie.year>=from && movie.year<=to){
                return movie;
            }
        });

        return filteredMovies.filter((movie) => movie!=null);
    } catch (err) {
        console.error("Error reading movie data: ", err);
    }
}