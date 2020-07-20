module.exports = {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    //Si ponemos console.log en lugar de false, las queries saldrán por consola
    "logging": false
  }