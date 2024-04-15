const express = require("express");

const authMiddleware = require("../middlewares/auth");
const userController = require("../controllers/user");

const router = express.Router();

router.use(authMiddleware.isAuthenticated);
router.get("/users", userController.getUser);

module.exports = router;
