const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("student_management", "root", "", {
  host: "localhost",
  dialect: "mysql",
  username: "root",
  password: "",
  port: 3306,
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
