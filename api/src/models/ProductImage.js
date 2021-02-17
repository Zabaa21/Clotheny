  
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('productImage', {
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
    imageId: {
        type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false
    },
  });
};