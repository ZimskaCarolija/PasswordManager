const Sequelize = require('sequelize');
require('dotenv').config();
console.log("Database "+process.env.MYSQL_DATABASE +" User " +process.env.MYSQL_USER + " passsword "+process.env.MYSQL_PASSWORD  )
const sequelize = new Sequelize('passwordmanager', 'db_user', 'db_password', {
    host: 'mysql',
    dialect: 'mysql',
    port:3306
  });

module.exports = sequelize;
