'use strict';
const {
  Model
} = require('sequelize');
const db = require('../models');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Wallet, Transaction }) {
      // define association here
      this.hasMany(Wallet, {
        foreignKey: 'user_id',
        //as: 'personalDetails',
      })
      this.hasMany(Transaction, {
        foreignKey: 'user_id'
      })
    }
  };
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    password: DataTypes.STRING,
    isActive: {
      defaultValue: process.env.NODE_ENV == 'production' ? false : true,
      type: DataTypes.BOOLEAN
    },
    firstLogin: {
      defaultValue: process.env.NODE_ENV == 'production' ? false : true,
      type: DataTypes.BOOLEAN
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};