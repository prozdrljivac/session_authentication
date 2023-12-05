const express = require("express");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }, recommended for HTTPS
  })
);

app.get("/", (req, res) => {
  res.send("You are authenticated!");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
