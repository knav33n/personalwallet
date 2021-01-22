require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const PersonalWallet = require("./models/PersonalWallet");
const Transaction = require("./models/Transaction");

const corsOptions = {
  origin: "http://localhost:4646",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

// const dbConnectionStatus = async () => {
//   try {
//     await db.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error.message);
//   }
// };
// dbConnectionStatus();

PersonalWallet.sync().then(() => {
  Transaction.sync().then(() => {
    PersonalWallet.hasMany(Transaction);
    Transaction.belongsTo(PersonalWallet);
  });
});

app.get("/", (req, res) => {
  res.send("backend says hi");
});

app.post("/user", async (req, res) => {
  const data = req.body;
  data.balance = parseInt(data.balance) * 100;
  PersonalWallet.create(req.body)
    .then((resp) => {
      const { dataValues } = resp;
      res.send(dataValues);
    })
    .catch(({ errors }) => {
      res.status(400).json({ errors });
    });
});

app.get("/users", (req, res) => {
  PersonalWallet.findAll()
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

app.get("/balance/:user_id", (req, res) => {
  PersonalWallet.findByPk(req.params.user_id)
    .then(({ dataValues }) => {
      res.send(dataValues);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

app.get("/transactions/:user_id", (req, res) => {
  Transaction.findAndCountAll({ where: { user_id: req.params.user_id } })
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err });
    });
});

app.get("/transactions", (req, res) => {
  Transaction.findAll({
    include: PersonalWallet,
  })
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

app.put("/add-funds", (req, res) => {
  manageFunds(req, res, true);
});

app.put("/spend-funds", (req, res) => {
  manageFunds(req, res, false);
});

const manageFunds = (req, res, isAdd) => {
  PersonalWallet.findByPk(req.body.user_id)
    .then((pwResponse) => {
      if (pwResponse?.dataValues) {
        let { dataValues } = pwResponse;
        let amountInPaise = req.body.amount * 100;

        let data = {};
        if (isAdd) {
          data = {
            personalWalletId: req.body.user_id,
            transaction_type: "add_funds",
            initial_balance: dataValues.balance,
            amount: amountInPaise,
            final_balance: dataValues.balance + amountInPaise,
            remarks: req.body.remarks ? req.body.remarks : "",
          };
        } else {
          if (dataValues.balance < amountInPaise) {
            res
              .status(500)
              .send({ error: { message: "Insufficient balance" } });
            return;
          }

          data = {
            personalWalletId: req.body.user_id,
            transaction_type: "spend_funds",
            initial_balance: dataValues.balance,
            amount: amountInPaise,
            final_balance: dataValues.balance - amountInPaise,
            remarks: req.body.remarks ? req.body.remarks : "",
          };
        }

        Transaction.create(data)
          .then((transactionResp) => {
            PersonalWallet.update(
              { balance: transactionResp.dataValues.final_balance },
              {
                where: {
                  id: req.body.user_id,
                },
              }
            )
              .then((resp) => {
                res.send({ status: "success" });
              })
              .catch((updateError) => {
                console.log(updateError);
                res.status(500).send({ error: updateError });
              });
          })
          .catch((createError) => {
            console.log(createError);
            res.status(500).send({ error: createError });
          });
      } else {
        res.status(500).send({ error: "No such user" });
      }
    })
    .catch((pwError) => {
      console.log(pwError);
      res.status(500).send({ error: pwError });
    });
};

app.listen(process.env.port || 4650, () =>
  console.log("Server running @ " + (process.env.port || 4650))
);
