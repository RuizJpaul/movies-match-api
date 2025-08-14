import express from "express";

import fs from "fs";
import path from "path";

const app = express();

const port = 2000;

app.use(express.json());

app.listen(port, () => {
    console.log("App is running in port "+port)
})

app.get("/saludo", (req, res) => {
    res.json({
        "saludo": "Hola amigos"
    })
})

app.get("/despedida", (req, res) => {
    res.json({
        "despedida": "Adios amigos"
    }) 
})

app.get("/peliculas", (req, res) => {
    const filePath = path.join(process.cwd(), "./data/movies.csv");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "No se pudo leer el archivo" });
        }   

        const newMovies = parseCsvToJson(data);
        res.json(newMovies);
    });
});

app.get("/peliculas/count", (req, res) => {
    const filePath = path.join(process.cwd(), "./data/movies.csv");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "No se pudo leer el archivo" });
        }   

        const newMovies = parseCsvToJson(data);
        res.json({
            cantidadPeliculas: newMovies.length - 2
        });
    });
})

app.get("/peliculas/rating-top", (req, res) => {
    const filePath = path.join(process.cwd(), "./data/movies.csv");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "No se pudo leer el archivo" });
        }   

        const newMovies = parseCsvToJson(data);
        const ratingTopMovies = newMovies.filter((movie) => Number(movie.rating) >= 9)
        res.json(ratingTopMovies);
    });
})

app.get("/peliculas/rating-low", (req, res) => {
    const filePath = path.join(process.cwd(), "./data/movies.csv");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "No se pudo leer el archivo" });
        }   

        const newMovies = parseCsvToJson(data);
        const ratingLowMovies = newMovies.filter((movie) => Number(movie.rating) <= 5)
        res.json(ratingLowMovies);
    });
})

app.get("/peliculas/:id", (req, res) => {
    try{
        const id = req.params.id;;
        console.log(id);
        const filePath = path.join(process.cwd(), "./data/movies.csv");
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                return res.status(500).json({ error: "No se pudo leer el archivo" });
            }   

            const newMovies = parseCsvToJson(data);
            const catchedMovie = newMovies.find((movie) => movie.id==id)
            if(!catchedMovie){
                return res.json({
                    msg: "No se encontro la pelicula"
                })
            }
            res.json(catchedMovie);
        });

    } catch(error){
        res.status(500).json({
            error: "Hubo un error inesperado en el servidor"
        })
    }
})

app.get("/peliculas/year/:year", (req, res) => {
    const year = req.params.year;
    const filePath = path.join(process.cwd(), "./data/movies.csv");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "No se pudo leer el archivo" });
        }   

        const newMovies = parseCsvToJson(data);
        const catchedMovies = newMovies.filter((movie) => movie.year==year)
        if(!catchedMovies){
            return res.json({
                msg: "No se encontro ninguna pelicula con esa fecha"
            })
        }
        res.json(catchedMovies);
    });
})

app.post("/crear-pelicula", (req, res) => {
    try{
        const dataProvided = req.body;
        const filePath = path.join(process.cwd(), "./data/movies.csv");
        const newMovies=[];
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                return res.status(500).json({ error: "No se pudo leer el archivo" });
            }   
            newMovies = parseCsvToJson(data);
        });
        
        const newMovieLine = `"${dataProvided.id}","${dataProvided.title}","${dataProvided.year}","${dataProvided.genre}","${dataProvided.director}","${dataProvided.actors}","${dataProvided.plot}","${dataProvided.rating}","${dataProvided.runtime}"\n`;
        fs.appendFile(filePath, newMovieLine, (err) => {
            if (err) {
                return res.status(500).json({ error: "No se pudo escribir en el archivo" });
            }
            res.json({ msg: "Pelicula agregada correctamente" });
        });

    }catch(error) {
        res.status(500).json({
            error: "Hubo un error inesperado en el servidor"
        })
    }
})

app.put("/actualizar-pelicula/:id", (req, res) => {
    const id = req.params.id;
    const dataProvided = req.body;
    const filePath = path.join(process.cwd(), "./data/movies.csv");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "No se pudo leer el archivo" });
        }
        let movies = parseCsvToJson(data);
        let movieIndex = movies.findIndex((movie) => movie.id === id);
        if (movieIndex === -1) {
            return res.status(404).json({ error: "No se encontró la película" });
        }

        // Update the movie fields
        movies[movieIndex] = {
            id: id,
            title: dataProvided.title || movies[movieIndex].title,
            year: dataProvided.year || movies[movieIndex].year,
            genre: dataProvided.genre || movies[movieIndex].genre,
            director: dataProvided.director || movies[movieIndex].director,
            actors: dataProvided.actors || movies[movieIndex].actors,
            plot: dataProvided.plot || movies[movieIndex].plot,
            rating: dataProvided.rating || movies[movieIndex].rating,
            runtime: dataProvided.runtime || movies[movieIndex].runtime,
        };

        // Convert movies back to CSV format
        const csvData = movies.map(movie =>
            `"${movie.id}","${movie.title}","${movie.year}","${movie.genre}","${movie.director}","${movie.actors}","${movie.plot}","${movie.rating}","${movie.runtime}"`
        ).join("\n");

        fs.writeFile(filePath, csvData, (err) => {
            if (err) {
                return res.status(500).json({ error: "No se pudo escribir en el archivo" });
            }
            res.json({ msg: "Película actualizada correctamente" });
        });
    });
})


function parseCsvToJson(data) {
    const lines = data.split("\n");
    const objects = lines.map((line) => {
        const object = line.split("\"");
        return object;
    });

    const movies = objects.map((obj) => {

        const movie=[];
        obj.forEach(element => {
            if(element!=="" && element!=="," && element!=="\r"){
                movie.push(element);
            }
        });
        return movie;
    });

    const newMovies = movies.map((movie) => {
        return ({
            id: movie[0],
            title: movie[1],
            year: movie[2],
            genre: movie[3],
            director: movie[4],
            actors: movie[5],
            plot: movie[6],
            rating: movie[7],
            runtime: movie[8],
        })
    })

    return newMovies;
}