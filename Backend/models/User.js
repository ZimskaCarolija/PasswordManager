const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database')
const {randomString}  =require('../util/HelpFunctions')
const User = sequelize.define(
    'User',
    {
        id:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        email:
        {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password:
        {
            type:DataTypes.INTEGER,
            allowNull:true
        },
        securityTime:
        {
            type:DataTypes.TIME,
            allowNull:true,
            default:Date.now()
        },
        securityToken:
        {
            type:DataTypes.STRING,
            allowNull:true,
            default:randomString()
        },accesss_token:
        {
            type:DataTypes.STRING,
            allowNull:true
        }


    }
    , {
        indexes: [],
    }
  );
  module.exports = User