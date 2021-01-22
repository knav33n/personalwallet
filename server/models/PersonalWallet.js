const Sequelize = require("sequelize");
const db = require("../config/db.config");

const PersonalWallet = db.define(
  "personal_wallet",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    balance: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "personal_wallet",
    freezeTableName: true,
  }
);

module.exports = PersonalWallet;
