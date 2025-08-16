import fs from "fs";
import path from "path";
import { parseCsvToJson } from "../app.js";

export function getRatingTop(req, res) {
    const filePath = path.join(process.cwd(), "./data/movies.csv");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "No se pudo leer el archivo" });
        }   

        const newMovies = parseCsvToJson(data);
        const ratingTopMovies = newMovies.filter((movie) => Number(movie.rating) >= 9)
        res.json(ratingTopMovies);
    });
}