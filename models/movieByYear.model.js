import fs from "fs";
import path from "path";
import { parseCsvToJson } from "../app.js";

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