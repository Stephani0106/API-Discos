const roteador = require('express').Router();
const TabelaDiscos = require('./TabelaDiscos.js');
const Disco = require('./Discos.js');


//List all discs by a given author
roteador.get('discos', async (req, res) => {
    const disks = await TabelaDiscos.list(req.author.id)
    res.status(200)
    res.send(JSON.stringify(disks))
})

//Search for a disk with a specific id
roteador.get('discos/:id', async (req, res) => {
    try {
        const identifiers = {
            id: req.params.id,
            author: req.author.id
        }

        const disk = new Disco(identifiers)
        disk.search()
        res.status(200)
    }
    catch (erro) {
        prox(erro)
    }
})

//Insert disks into the database, linking with the author id
roteador.post('discos', async (req, res, prox) => {
    try {
        const idauthor = req.author.id
        const body = req.body
        const data = Object.assign({}, body, { author: idauthor })
        const disk = new Disco(data)
        await disk.add()
        res.status(201)
        res.send(disk)
    }
    catch (erro) {
        prox(erro)
    }
})

//Update information from a disk
roteador.put('/discos/:id', async (req, res, prox) => {
    try {
        const identifiers = {
            id: req.params.id,
            author: req.author.id
        }

        const body = req.body
        const data = Object.assign({}, body, identifiers)
        const disk = new Disco(data)
        await disk.update()
        res.status(204)
        res.end()
    }
    catch (erro) {
        prox(erro)
    }
})

//Delete information from a disk
roteador.delete('/discos/:id', async (req, res, prox) => {
    try {
        const identifiers = {
            id: req.params.id,
            author: req.author.id
        }

        const disk = new Disco(identifiers)
        await disk.remove()
        res.status(204)
        res.end()
    }
    catch (erro) {
        prox(erro)
    }
})

module.exports = roteador