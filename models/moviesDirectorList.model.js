import fs from "fs";
import path from "path";
import { parseCsvToJson } from "../app.js";

export function MoviesDirectorList() {
    const filePath = path.join(process.cwd(), "./data/movies.csv");
    try {
        const data = fs.readFileSync(filePath, "utf8");
        const movies = parseCsvToJson(data);
        const allDirectors = []
        const moviesByDirector = movies.map((element) => {
            const directorList = element.director.split(" and ");
            const newList = directorList.map((director) => {
                let ans = false;
                if (allDirectors.includes(director)) {
                    ans = true;
                }

                if (!ans) {
                    allDirectors.push(director);
                }
            })
        });

        return allDirectors.filter((director) => director!="director");
    } catch (err) {
        console.error("Error reading movie data: ", err);
        return [];
    }
}