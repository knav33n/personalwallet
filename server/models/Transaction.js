const Sequelize = require("sequelize");
const db = require("../config/db.config");

const Transaction = db.define(
  "transaction",
  {
    personalWalletId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "personal_wallet",
        key: "id",
      },
    },
    transaction_type: {
      type: Sequelize.ENUM,
      values: ["add_funds", "spend_funds"],
      allowNull: false,
    },
    initial_balance: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    final_balance: { type: Sequelize.INTEGER, allowNull: false },
    remarks: {
      type: Sequelize.TEXT,
    },
  },
  {
    tableName: "transaction",
    freezeTableName: true,
  }
);

module.exports = Transaction;
