const fs = require("fs").promises;

async function getMovieByTitle(title) {

    try{{
        const data = await fs.readFile('data/movies.csv','utf8');
        const lines = data.split('\n');
        const matchMovie = lines.find(line => line.includes(title));
        if(!matchMovie) {
            console.log("🟡 No se encontro la pelicula: " + title);
            return null;
        }
        return parseCsvLineToObject(matchMovie).title;
    }} catch (err) {
        console.error("Error reading the CSV file: ", err);
        return null;
    }
}

function parseCsvLineToObject(line) {
    const columns = line.split(',');
    return {
        id: columns[0],
        title: columns[1],
        year: columns[2],
        genre: columns[3],
        director: columns[4]
    }
}

module.exports= {
    getMovieByTitle
}