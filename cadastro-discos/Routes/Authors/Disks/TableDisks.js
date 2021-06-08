const Model = require('./TableModelDisks.js')
const NotFound = require('../../../Errors/NotFound.js')

module.exports = {
    listAll() {
        return Model.findAll()
    },

    async list(idAuthor) {
        return Model.findAll({
            where: { author: idAuthor }
        })
    },

    async findByID(idDisk, idAuthor) {
        const found = await Model.findOne({
            where: { id: idDisk, author: idAuthor }
        })

        if(!found) {
            throw new NotFound()
        }

        return found
    },

    async insert(data) {
        return Model.create(data)
    }, 

    async revise(idDisk, dataToUpdate) {
        return Model.update(
            dataToUpdate,
            {
                where: { id: idDisk }
            }
        )
    },

    delete(idDisk, idAuthor) {
        return Model.destroy({
            where: { id: idDisk, author: idAuthor }
        })
    }
}