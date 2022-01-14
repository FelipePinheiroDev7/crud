const Sequelize = require('sequelize');
const database = require('./db');

const cliente = database.define('cliente',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    nome:Sequelize.STRING,
    rg:Sequelize.STRING,
    dtnasc:Sequelize.STRING,
})

module.exports = cliente;