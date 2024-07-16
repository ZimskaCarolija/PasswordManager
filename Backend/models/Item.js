const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const User = require('./User');

const Item = sequelize.define('Item', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    iv: {
        type: DataTypes.STRING,
        defaultValue: "",
    }
}, {
    indexes: [],
});


Item.belongsTo(User, { foreignKey: { allowNull: false } });
User.hasMany(Item, { foreignKey: { allowNull: false } });

module.exports = Item;
