const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
    },
    gender: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    phone: {
      type: DataTypes.STRING,
    },
    recoveryId: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING
    },
    passwordResetToken: {
      type: DataTypes.STRING
    },
    passwordResetExpires: {
      type: DataTypes.DECIMAL(38,0),
    },
  });
};
