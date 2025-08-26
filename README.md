# movies-match-api

## HU-01 Listado de géneros únicos 🟢

Como usuario de la API

quiero obtener un listado de todos los géneros disponibles en el catálogo de películas

para poder explorar rápidamente las categorías sin necesidad de revisar toda la lista de películas.

### Criterios de Aceptación

- Endpoint: GET /movies/genre/list

-  Debe devolver un arreglo con todos los géneros únicos presentes en la base de datos.

- No se deben repetir géneros en la respuesta.

- La respuesta debe estar en formato JSON.


## HU-02 Listado de directores únicos 🟢

Como usuario de la API

quiero obtener un listado de todos los directores únicos en el catálogo de películas

para poder identificar fácilmente qué directores tienen películas registradas.

### Criterios de Aceptación

- Endpoint: GET /movies/director/list

- Debe devolver un arreglo con los nombres de los directores, sin duplicados.

- La respuesta debe estar en formato JSON.


## Buscar películas por rango de año (con queryParams) 🟢

Como usuario de la API

quiero poder buscar películas dentro de un rango de años específico

para encontrar fácilmente películas de una época determinada.

### Criterios de Aceptación

- Endpoint: GET /range?fromYear=<año>&toYear=<año>

- Si se envía solo fromYear, debe devolver todas las películas desde ese año en adelante.

- Si se envía solo toYear, debe devolver todas las películas hasta ese año.

- Si se envían ambos, debe devolver todas las películas entre esos dos años inclusivamente.

- La respuesta debe estar en formato JSON.


## Paginación de resultados 🟢

Como usuario de la API

quiero poder consultar las películas en páginas (con límite de resultados por página)

para navegar fácilmente por los datos sin recibir toda la lista completa de una sola vez.

### Criterios de Aceptación

- El endpoint GET /movies debe aceptar los parámetros page y limit.

- La respuesta debe incluir en un objeto meta la siguiente información:

  - total → cantidad total de películas.

  - page → número de página actual.

  - pages → total de páginas calculadas.

  - limit → límite de resultados por página.

- La propiedad page debe contener únicamente las películas correspondientes a esa página.