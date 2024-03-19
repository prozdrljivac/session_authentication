const bcrypt = require("bcrypt");
const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const authRoutes = require("./routes/auth");
const sequelize = require("./utils/database");
const User = require("./models/user");

const app = express();

app.use(
  session({
    secret: process.env.SECRET_KEY,
    store: new SequelizeStore({
      db: sequelize,
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

sequelize
  .sync()
  .then(() => {
    return bcrypt.hash(process.env.USER_PW, 12);
  })
  .then((hashedPassword) => {
    return User.findOne({ where: { email: process.env.USER_EMAIL } })
      .then((user) => {
        if (user) {
          return user;
        }
        return User.create({
          email: process.env.USER_EMAIL,
          password: hashedPassword,
        });
      })
      .then(() => {
        app.listen(3000, () => {
          console.log("Server listening on port 3000");
        });
      });
  })
  .catch((err) => {
    console.log(err);
  });
