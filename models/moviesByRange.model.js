import fs from "fs";
import path from "path";
import { parseCsvToJson } from "../app.js";

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
