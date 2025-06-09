"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "students",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        first_name: {
          type: Sequelize.STRING,
          field: "first_name",
          allowNull: true,
        },
        last_name: {
          type: Sequelize.STRING,
          field: "last_name",
          allowNull: true,
        },
        gender: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        date_of_birth: {
          type: Sequelize.DATEONLY,
          field: "date_of_birth",
          allowNull: true,
        },
      },
      {
        timestamps: false,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("students");
  },
};
