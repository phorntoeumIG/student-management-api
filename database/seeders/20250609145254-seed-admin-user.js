"use strict";

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Check if admin user already exists
      const existingAdmin = await queryInterface.sequelize.query(
        `SELECT * FROM users WHERE email = 'admin@gmail.com'`,
        {
          type: queryInterface.sequelize.QueryTypes.SELECT,
        }
      );

      if (existingAdmin.length === 0) {
        // Hash the password
        const hashedPassword = await queryInterface.sequelize.query(
          `SELECT BINARY(?) as hashed`,
          {
            replacements: [await bcrypt.hash("Admin@2025", 10)],
            type: queryInterface.sequelize.QueryTypes.SELECT,
          }
        );

        // Create admin user
        await queryInterface.bulkInsert(
          "users",
          [
            {
              email: "admin@gmail.com",
              password: hashedPassword[0].hashed,
              isLogout: false,
            },
          ],
          {}
        );

        console.log("Admin user created successfully");
      } else {
        console.log("Admin user already exists");
      }
    } catch (error) {
      console.error("Error seeding admin user:", error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    // Remove admin user
    await queryInterface.bulkDelete(
      "users",
      {
        email: "admin@gmail.com",
      },
      {}
    );
  },
};
