const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("reviews", {
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1,
                max: 5
            },
        },
    })
}