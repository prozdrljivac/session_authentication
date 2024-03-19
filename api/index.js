const bcrypt = require("bcrypt");
const express = require("express");
const session = require("express-session");

const authRoutes = require("./routes/auth");
const User = require("./models/user");

const app = express();

// TODO Save session to the DB
app.use(
  session({
    secret: process.env.SECRET_KEY,
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

User.sync()
  .then(() => {
    return bcrypt.hash(process.env.USER_EMAIL, 12);
  })
  .then((hashedPassword) => {
    return User.findOne({ where: { email: process.env.USER_PW } })
      .then((user) => {
        if (user) {
          return user;
        }
        return User.create({
          email: process.env.USER_PW,
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
