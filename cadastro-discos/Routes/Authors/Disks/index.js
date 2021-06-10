const Router = require('express').Router({ mergeParams: true })
const tableDisk = require('./TableDisks.js')
const Disk = require('./Disks.js')
const SerializerDisk = require('../../../serializer.js').SerializerDisk

//List all discs by a given author
//TODO: Descomentar e ajustar para buscar discos do artista
// router.get('/', async (req, res) => {
//     const disks = await tableDisk.list(req.author.id)
//     res.send(JSON.stringify(disks))
// })

//List all discs 
Router.get('/discos', async (req, res) => {
    const results = await tableDisk.listAll()
    res.send(JSON.stringify(results))
})

//Search for a disk with a specific id
Router.get('/discos/:idDisk', async (req, res, prox) => {
    try {
        const id = req.params.idDisk
        // const disk = new Disk(identifiers)
        const disk = new Disk({ id: id })

        await disk.search()
        res.status(200)

        const serializer = new SerializerDisk(
            res.getHeader('Content-Type'),
            ['creationDate', 'updatedDate']
        )

        res.send(serializer.serialize(disk))
    }
    catch (error) {
        prox(error)
    }
})

//Insert disks into the database, linking with the author id
Router.post('/discos', async (req, res, prox) => {
    try {
        const body = req.body
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
Router.put('/discos/:idDisk', async (req, res, prox) => {
    try {
        const id = req.params.idDisk
        const body = req.body
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
Router.delete('/discos/:idDisk', async (req, res, prox) => {
    try {
        const id = req.params.idDisk
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