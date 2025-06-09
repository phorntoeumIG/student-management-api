"use strict";

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Check if admin user already exists
      const existingAdmin = await queryInterface.sequelize.query(
        `SELECT * FROM users WHERE email = 'admin@gamil.com'`,
        {
          type: queryInterface.sequelize.QueryTypes.SELECT,
        }
      );

      if (existingAdmin.length === 0) {
        // Hash the password
        const hashedPassword = await bcrypt.hash("Admin@2025", 10);

        // Create admin user
        await queryInterface.bulkInsert("users", [
          {
            email: "admin@gamil.com",
            password: hashedPassword,
            role: "admin",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);

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
    try {
      await queryInterface.bulkDelete(
        "users",
        {
          email: "admin@example.com",
        },
        {}
      );
      console.log("Admin user removed");
    } catch (error) {
      console.error("Error removing admin user:", error);
      throw error;
    }
  },
};
