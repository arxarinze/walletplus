'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Wallet, User }) {
      this.belongsTo(User, {
        foreignKey: 'user_id'
      });
      this.belongsTo(Wallet, {
        foreignKey: 'wallet_id'
      });
    }
  };
  Transaction.init({
    user_id: DataTypes.INTEGER,
    wallet_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    amount: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};