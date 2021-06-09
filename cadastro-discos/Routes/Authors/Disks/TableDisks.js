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

    //TODO: Descomentar quando houver vínculo com o artista
    // async findByID(idDisk, idAuthor) {
    //     const found = await Model.findOne({
    //         where: { id: idDisk, author: idAuthor }
    //     })
    //TODO: Apagar quando houver vínculo com o artista
    async findByID(idDisk) {
        const found = await Model.findOne({
            where: { id: idDisk }
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

    //TODO: Descomentar quando houver vínculo com o artista
    // delete(idDisk, idAuthor) {
    //     return Model.destroy({
    //         where: { id: idDisk, author: idAuthor }
    //     })
    // }
    //TODO: Apagar quando houver vínculo com o artista
    delete(idDisk) {
        return Model.destroy({
            where: { id: idDisk }
        })
    }
}