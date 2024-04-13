const bcrypt = require("bcrypt");
const db = require("../models");

const User = require("../models/user")(db.sequelize, db.Sequelize.DataTypes);

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (!user) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  const isCredentialsValid = await bcrypt.compare(password, user.password);
  if (!isCredentialsValid) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  req.session.userId = user.id;
  return res.status(200).json({ message: "Authenticated" });
};
