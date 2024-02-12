# Proyecto de Videojuegos 🎮

Este proyecto consiste en una aplicación web construida con React en el frontend y Express en el backend para interactuar con una API de videojuegos.

## Características

- Explora una amplia variedad de videojuegos y géneros.
- Filtra videojuegos por género y plataforma.
- Busca videojuegos por nombre.
- Crea nuevos videojuegos.
- Elimina videojuegos existentes.

## Tecnologías Utilizadas

### Backend 🖥️
- Node.js
- Express
- PostgreSQL
- Sequelize (ORM)
- Nodemon (para desarrollo)

### Frontend 🌐
- React
- Redux (con Redux Thunk para manejo de estado)
- Axios (para realizar solicitudes HTTP)
- React Router DOM (para enrutamiento)

## Iniciar el Proyecto 🚀

1. Clona este repositorio
2. Ingresa a la carpeta del backend: `cd api`
3. Instala las dependencias del backend: `npm install`
4. Inicia el servidor del backend: `npm start`
5. Ingresa a la carpeta del frontend: `cd client`
6. Instala las dependencias del frontend: `npm install`
7. Inicia la aplicación del frontend: `npm start`

La aplicación del frontend debería abrirse automáticamente en tu navegador.

## Rutas de la API 🛣️

- GET `/videogames`: Obtiene todos los videojuegos.
- GET `/videogames/:id`: Obtiene un videojuego específico por su ID.
- POST `/videogames`: Agrega un nuevo videojuego a la base de datos.
- GET`/genres`: Obtiene la lista de géneros de videojuegos.
- GET`/platforms`: Obtiene la lista de plataformas de videojuegos.
- DELETE `/videogames/:id`: Elimina un videojuego existente por su ID.

¡Explora, juega y diviértete! 🚀🎮

