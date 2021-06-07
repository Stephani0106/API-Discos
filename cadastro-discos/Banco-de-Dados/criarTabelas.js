const Model = require('../Rotas/Artistas/Discos/ModeloTabelaDiscos.js')

Model
    //Synchronizes with database
    .sync()
    //Return a success message
    .then(() => console.log("Table created successfully"))
    //Catch the error with catch and return the same
    .catch(console.log)