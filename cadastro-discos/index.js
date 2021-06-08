const express = require('express')
const app = express()
const config = require('config')
const Router = require('./Routes/Authors/index.js')
const NotFound = require('./Errors/NotFound.js')
const InvalidField = require('./Errors/InvalidField.js')
const DataNotProvided = require('./Errors/DataNotProvided.js')
const UnsupportedValue = require('./Errors/UnsupportedValue.js')
const acceptedFormats = require('./serializer').acceptedFormats
const SerializerError = require('./serializer').SerializerError

app.use(express.json())

app.use((req, res, prox) => {
    //Stores the format of the information received in the 'Accept' header in the 'requested format' variable
    let requiredFormat = req.header('Accept')

    //If the 'requested format' is equal to empty, that is, */*
    if(requiredFormat === '*/*') {
        requiredFormat = 'application/json'
    }

    //If the 'requested format' does not exist in the 'accepted formats' list by the application
    if(acceptedFormats.indexOf(requiredFormat) === -1) {
        res.status(406)
        res.end()
        return
    }

    //Sets the format of the information in the 'Content-Type' header to be the same as the 'requested format' received
    res.setHeader('Content-Type', requiredFormat)
    prox()
})

app.use('/api', Router)

app.use((erro, req, res, prox) => {
    let status = 500

    if(erro instanceof NotFound) {
        status = 404
    }

    if(erro instanceof InvalidField) {
        status = 400
    }

    if(erro instanceof DataNotProvided) {
        status = 400
    }

    if(erro instanceof UnsupportedValue) {
        status = 406
    }

    const serializer = new SerializerError(res.getHeader('Content-Type'))
    res.status(status)
    res.send(
        serializer.serialize({
            message: erro.message,
            id: erro.idError
        })
    )
})

app.listen(config.get('api.port'), () => console.log("The API is connected!"))
