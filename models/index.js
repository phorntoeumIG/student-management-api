const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("student_management", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 3307,
  logging: false,
});

const DataTypes = Sequelize.DataTypes;

const Users = require("./users")(sequelize, DataTypes);
const Students = require("./students")(sequelize, DataTypes);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = Users;
db.Students = Students;

module.exports = db;
