const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('palette', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    status:{
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    primaryMain: {
      type: DataTypes.STRING
    },
    primaryDarker:{
      type: DataTypes.STRING,
    },
    secondaryMain: {
      type: DataTypes.STRING
    },
    secondaryDarker: {
      type: DataTypes.STRING
    },
    background: {
      type: DataTypes.STRING
    },
  });
};