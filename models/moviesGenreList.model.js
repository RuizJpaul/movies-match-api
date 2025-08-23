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

        return allGenres.filter((genre) => genre !== "genre").sort((a, b) => a.localeCompare(b));
    } catch (err) {
        console.error("Error reading movie data: ", err);
        return [];
    }
}