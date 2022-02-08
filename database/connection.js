const Sequelize = require('sequelize')

const connection = new Sequelize(process.env.DATABASE_URL || '', {
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = connection