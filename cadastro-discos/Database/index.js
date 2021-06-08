const Sequelize = require('sequelize')
const config = require('config')

//Defines the connection settings through Sequelize, getting the information from a separate file (config/default.json)
const instance = new Sequelize(
    config.get('mysql.database'),
    config.get('mysql.user'),
    config.get('mysql.password'),
    {
        host: config.get('mysql.host'),
        dialect: 'mysql'
    }
)

module.exports = instance