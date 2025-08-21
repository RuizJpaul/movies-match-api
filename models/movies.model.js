import fs from "fs";
import path from "path";
import { parseCsvToJson } from "../app.js";

export function movies() {
    const filePath = path.join(process.cwd(), "./data/movies.csv");
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return parseCsvToJson(data);
    } catch (err) {
        console.error("Error reading movie data: ", err);
        return [];
    }
}