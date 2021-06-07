const Model = require('./ModeloTabelaDiscos.js')
const NotFound = require('../../../Erros/NotFound.js')

module.exports = {

    list(idAuthor) {
        return Model.findAll({
            where: { author: idAuthor }
        })
    },

    async takeByID(idDisk, idAuthor) {
        const found = await Model.findOne({
            where: { id: idDisk, author: idAuthor }
        })

        if(!found) {
            throw new NotFound()
        }

        return found
    },

    insert(data) {
        return Model.create(data)
    }, 

    revise(idDisk, idAuthor, dataToUpdate) {
        return Model.update(
            dataToUpdate,
            {
                where: { id: idDisk, author: idAuthor }
            }
        )
    },

    delete(idDisk, idAuthor) {
        return Model.destroy({
            where: { id: idDisk, author: idAuthor }
        })
    }
}