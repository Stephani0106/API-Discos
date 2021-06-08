const express = require('express')
const app = express()
const config = require('config')
const roteador = require('./Routes')

app.use(express.json())
app.use('/API/pagamentos', roteador)
app.listen(config.get('api.port'), () => console.log('A API esta funcionando!'))