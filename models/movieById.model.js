import fs from "fs";
import path from "path";
import { parseCsvToJson } from "../app.js";

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