const Sequelize = require('sequelize')
const Instance = require('../../../Database')

const tableColumns = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // author: {    //Deve receber o ID do autor
    //     type: Sequelize.INTEGER, 
    //     allowNull: false,
    //     references: {
    //         model: require(''),
    //         key: 'id'
    //     }
    // },
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
    createdAt: 'creationDate',
    updatedAt: 'updatedDate'
};

module.exports = Instance.define('disk', tableColumns, settings)