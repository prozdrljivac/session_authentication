const {
  beforeAll,
  describe,
  expect,
  it,
  jest: mocker,
} = require("@jest/globals");

const bcrypt = require("bcrypt");

const authController = require("./auth");
const db = require("../models");
const User = require("../models/user")(db.sequelize, db.Sequelize.DataTypes);

describe("login", () => {
  beforeAll(async () => {
    const testUser = {
      email: "test@email.com",
      password: "test123",
    };
    await db.sequelize.sync();
    const hashedPassword = await bcrypt.hash(testUser.password, 12);
    await User.create({
      email: testUser.email,
      password: hashedPassword,
    });
  });

  it("should return 401 if user is not found", async () => {
    // Arrange
    const req = {
      body: {
        email: "test1@email.com",
        password: "password",
      },
    };
    const res = {
      status: mocker.fn().mockReturnThis(),
      json: mocker.fn(),
    };
    const next = mocker.fn();

    // Act
    await authController.login(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthenticated" });
  });

  it("should return 401 if wrong password is provided", async () => {
    // Arrange
    const req = {
      body: {
        email: "test@email.com",
        password: "password1",
      },
    };
    const res = {
      status: mocker.fn().mockReturnThis(),
      json: mocker.fn(),
    };
    const next = mocker.fn();

    // Act
    await authController.login(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthenticated" });
  });

  it("should add userId to session if credentials are valid", async () => {
    // Arrange
    const req = {
      body: {
        email: "test@email.com",
        password: "test123",
      },
      session: {},
    };
    const res = {
      status: mocker.fn().mockReturnThis(),
      json: mocker.fn(),
    };
    const next = mocker.fn();

    // Act
    await authController.login(req, res, next);

    // Assert
    expect(req.session.userId).toBeDefined();
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
