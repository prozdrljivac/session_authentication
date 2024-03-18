const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  const isCredentialsValid = await bcrypt.compare(password, user.password);

  if (isCredentialsValid) {
    req.session.userId = user.id;
    return res.status(200).json({ message: "Login successful" });
  }
};
