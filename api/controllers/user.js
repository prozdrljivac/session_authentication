exports.getUser = async (req, res, next) => {
  res.status(200).json({ email: "test@email.com" });
};
