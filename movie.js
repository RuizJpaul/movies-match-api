const {getMovieByTitle} = require("./movieUtils.js");


(async () => {

    console.log("⭐ Bienvenido a Movie Match ⭐");
    console.log("===============================");

    const inputMovie = process.argv[2] ?? null;

    if(!inputMovie){
        console.log("🟡 Falto el nombre de la peli")
        return;
    }

    console.log("🟢 Pelicula a buscar: " + inputMovie);
    const movie = await getMovieByTitle(inputMovie);
    console.log(movie);
})();


