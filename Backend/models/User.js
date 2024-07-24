const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const { randomString } = require('../util/HelpFunctions');

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING, 
            allowNull: true,
            defaultValue: null
        },
        securityTime: {
            type: DataTypes.DATE, 
            allowNull: true,
            defaultValue: Sequelize.NOW
        },
        securityToken: {
            type: DataTypes.STRING,
            allowNull: true,
            //defaultValue:randomString()
        },
        access_token: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        indexes: [], 
    }
);

module.exports = User;
