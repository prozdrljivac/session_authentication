"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("password", 12);
    await queryInterface.bulkInsert(
      "users",
      [
        {
          email: "test@email.com",
          password: hashedPassword,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.delete("users", null, {});
  },
};
