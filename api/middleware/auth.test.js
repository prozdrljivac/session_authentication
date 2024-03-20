const { describe, expect, it, jest: mocker } = require("@jest/globals");
const authMiddleware = require("./auth");

describe("isAuthenticated middleware", () => {
  it("should call next() if user is authenticated", () => {
    const req = { session: { userId: "123" } };
    const res = {};
    const next = mocker.fn();

    authMiddleware.isAuthenticated(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should return 401 status and error message if user is not authenticated", () => {
    const req = { session: {} };
    const res = {
      status: mocker.fn().mockReturnThis(),
      json: mocker.fn(),
    };
    const next = mocker.fn();

    authMiddleware.isAuthenticated(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "User not authenticated",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
