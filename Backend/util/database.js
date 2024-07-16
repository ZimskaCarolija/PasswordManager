const Sequelize = require('sequelize');
const sequelize = new Sequelize('passwordmanager','root','',{dialect:'mysql',host:'localhost'});

module.exports = sequelize