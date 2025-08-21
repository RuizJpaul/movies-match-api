import fs from "fs";
import path from "path";
import { parseCsvToJson } from "../app.js";

export function MoviesCount() {
    const filePath = path.join(process.cwd(), "./data/movies.csv");
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return parseCsvToJson(data).length -1;
    } catch (err) {
        console.error("Error reading movie data: ", err);
        return [];
    }
}