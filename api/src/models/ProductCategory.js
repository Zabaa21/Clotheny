  
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('productCategory', {
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
    categoryId: {
        type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false
    },
  });
};