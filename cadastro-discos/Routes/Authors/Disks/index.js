const Router = require('express').Router({ mergeParams: true })
const tableDisk = require('./TableDisks.js')
const Disk = require('./Disks.js')
const SerializerDisk = require('../../../serializer.js').SerializerDisk

//List all discs by a given author
//TODO: Descomentar quando houver vínculo com o artista
// router.get('/', async (req, res) => {
//     const disks = await tableDisk.list(req.author.id)
//     res.send(JSON.stringify(disks))
// })

//TODO: Apagar quando houver vínculo com o artista
//List all discs 
Router.get('/discos', async (req, res) => {
    const results = await tableDisk.listAll()
    res.send(JSON.stringify(results))
})

//Search for a disk with a specific id
Router.get('/:idDisk', async (req, res, prox) => {
    try {
        //TODO: Descomentar quando houver vínculo com o artista  
        // const identifiers = {
        //     id: req.params.idDisk,
        //     author: req.author.id
        // }
        //TODO: Apagar quando houver vínculo com o artista
        const identifiers = req.params.idDisk
        // const disk = new Disk(identifiers)
        const disk = new Disk({ id: identifiers })

        await disk.search()
        res.status(200)

        const serializer = new SerializerDisk(
            res.getHeader('Content-Type'),
            ['creationDate']
        )

        res.send(serializer.serialize(disk))
    }
    catch (error) {
        prox(error)
    }
})

//Insert disks into the database, linking with the author id
Router.post('/', async (req, res, prox) => {
    try {
        //TODO: Descomentar linhas abaixo quando houver vínculo com o artista
        // const idAuthor = req.author.id
        const body = req.body
        // const data = Object.assign({}, body, { author: idAuthor })
        // const disk = new Disk(data)
        //TODO: Apagar quando houver vínculo com o artista
        const disk = new Disk(body)
        await disk.add()
        res.status(201)
        res.send(disk)
    }
    catch (error) {
        prox(error)
    }
})

//Update information from a disk
Router.put('/:idDisk', async (req, res, prox) => {
    try {
        //TODO: Descomentar linhas abaixo quando houver vínculo com o artista
        // const identifiers = {
        //     id: req.params.idDisk,
        //     author: req.author.id
        // }
        //TODO: Apagar quando houver vínculo com o artista
        const id = req.params.idDisk
        const body = req.body
        // const data = Object.assign({}, body, identifiers)
        //TODO: Apagar quando houver vínculo com o artista
        const data = Object.assign({}, body, { id: id })
        const disk = new Disk(data)
        await disk.update()
        res.status(204)
        res.end()
    }
    catch (error) {
        prox(error)
    }
})

//Delete information from a disk
Router.delete('/:idDisk', async (req, res, prox) => {
    try {
        //TODO: Descomentar linhas abaixo quando houver vínculo com o artista
        // const identifiers = {
        //     id: req.params.idDisk,
        //     author: req.author.id
        // }
        //TODO: Apagar quando houver vínculo com o artista
        const id = req.params.idDisk
        // const disk = new Disk(identifiers)
        //TODO: Apagar quando houver vínculo com o artista
        const disk = new Disk({ id: id })
        await disk.remove()
        res.status(204)
        res.end()
    }
    catch (error) {
        prox(error)
    }
})

module.exports = Router