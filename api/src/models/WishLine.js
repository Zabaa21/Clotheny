const { DataTypes } = require('sequelize');

// Las ordenes deben tener línea de orden que contiene el precio, productId, y cantidad.

module.exports = (sequelize) => {
  sequelize.define('WishLine', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false
    },
  });
};