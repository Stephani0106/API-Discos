const Sequelize = require('sequelize')
const Instance = require('../../../Database')

const tableColumns = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    //TODO: Descomentar quando houver vínculo com o artista
    // author: {    //Deve receber o ID do autor
    //     type: Sequelize.INTEGER, 
    //     allowNull: false,
    //     references: {
    //         model: require(''),
    //         key: 'id'
    //     }
    // },
    //TODO: Apagar quando houver vínculo com o artista
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    year: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
}

const settings = {
    freezeTableName: true,
    tableName: 'Disks',
    timestamps: true,
    createdAt: 'creationDate'
};

module.exports = Instance.define('disk', tableColumns, settings)