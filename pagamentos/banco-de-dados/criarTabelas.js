const ModeloTabela = require('../Routes/modeloTabelas')

ModeloTabela
    .sync()
    .then(() => console.log('Tabela criada com sucesso'))
    .catch(console.log)