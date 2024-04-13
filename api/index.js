const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const authRoutes = require("./routes/auth");
const db = require("./models");

const app = express();

app.use(
  session({
    secret: process.env.SECRET_KEY,
    store: new SequelizeStore({
      db: db.sequelize,
      expiration: 60 * 60 * 1000,
      checkExpirationInterval: 15 * 60 * 1000,
      tableName: "sessions",
    }),
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(authRoutes);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
