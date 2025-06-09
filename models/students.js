module.exports = (sequelize, DataTypes) => {
  return sequelize.define('students', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
      defaultValue: null
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
      defaultValue: null
    },
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      field: 'date_of_birth',
      defaultValue: null
    }
  }, {
    tableName: 'students',
    timestamps: false,
  });
};