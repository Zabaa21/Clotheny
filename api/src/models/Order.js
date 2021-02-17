const { DataTypes } = require('sequelize');

// Ordenes:

// Una orden debe pertenecer a un usuario.
// Las ordenes deben tener línea de orden que contiene el precio, productId, y cantidad.
// Si un usuario completa una orden, esa orden debe mantener el precio del item al momento 
// de la compra, sin importar que el precio del producto cambie después.
// estado (carrito, creada, procesando, cancelada, completa)

module.exports = (sequelize) => {
  sequelize.define('order', {
    state: {
      type: DataTypes.ENUM({
          values: ['cart', 'created', 'processing', 'cancelled', 'completed'],
          allowNull: false,
      })
    },
    purchaseAmount: {
      type: DataTypes.INTEGER
    },
    shippingCost: {
      type: DataTypes.STRING
    },
    shippingAddress: {
      type: DataTypes.STRING
    },
    shippingZip: {
      type: DataTypes.STRING
    },
    shippingCity: {
      type: DataTypes.STRING
    },
    shippingState: {
      type: DataTypes.STRING
    }, 
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    comments: {
      type: DataTypes.STRING
    },
    paymentDetails: {
      type: DataTypes.STRING
    },
  });
};