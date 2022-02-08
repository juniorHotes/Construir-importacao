const Sequilize = require('sequelize')
const connection = require('./connection')

const Filias = connection.define('filiais', {
    n_filial: {
        type: Sequilize.INTEGER,
        allowNull: false
    },
    bandeira: {
        type: Sequilize.TEXT,
        allowNull: false
    },
    nome: {
        type: Sequilize.TEXT,
        allowNull: false
    },
    regional: {
        type: Sequilize.TEXT,
        allowNull: false
    },
    tipo: {
        type: Sequilize.TEXT,
        allowNull: true
    }
})

// Filias.sync({ force: true })

module.exports = Filias