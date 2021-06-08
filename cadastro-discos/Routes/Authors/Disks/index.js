const router = require('express').Router({ mergeParams: true })
const tableDisk = require('./TableDisks.js')
const Disk = require('./Disks.js')
const SerializerDisk = require('../../../serializer.js').SerializerDisk

//List all discs by a given author
router.get('/', async (req, res) => {
    const disks = await tableDisk.list(req.author.id)
    res.send(JSON.stringify(disks))
})

//Search for a disk with a specific id
router.get('/:idDisk', async (req, res, prox) => {
    try {
        const identifiers = {
            id: req.params.idDisk,
            author: req.author.id
        }
        const disk = new Disk(identifiers)

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
router.post('/', async (req, res, prox) => {
    try {
        const idAuthor = req.author.id
        const body = req.body
        const data = Object.assign({}, body, { author: idAuthor })
        const disk = new Disk(data)
        await disk.add()
        res.status(201)
        res.send(disk)
    }
    catch (error) {
        prox(error)
    }
})

//Update information from a disk
router.put('/:idDisk', async (req, res, prox) => {
    try {
        const identifiers = {
            id: req.params.idDisk,
            author: req.author.id
        }

        const body = req.body
        const data = Object.assign({}, body, identifiers)
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
router.delete('/:idDisk', async (req, res, prox) => {
    try {
        const identifiers = {
            id: req.params.idDisk,
            author: req.author.id
        }

        const disk = new Disk(identifiers)
        await disk.remove()
        res.status(204)
        res.end()
    }
    catch (error) {
        prox(error)
    }
})

module.exports = router