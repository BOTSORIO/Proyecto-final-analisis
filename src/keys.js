/*
* Proyecto final de la asignatura Analisis de algoritmos
* Elaborado por:
* Braian Camilo Piedrahita Rodriguez
* Sebastian Quintero Osorio
* Melissa Ortiz Perez
*/

/*
* Modulo que exporta las credenciales de la base de
* datos para iniciar la conexión
*/
module.exports = {
    database: {

        //Base de datos local
        //host: 'localhost',
        //user: 'root',
        //password: 'root',
        //database: 'test_analisis'

        //Base de datos de la nube (produccion)
        host: 'testanalisis.mysql.database.azure.com',
        user: 'administrador',
        password: 'test1234!',
        database: 'test_analisis'
    }
}