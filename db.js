const Sequelize = require('sequelize')
const sequelize = new Sequelize('crud','root','Lipe2575',{
    dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize;