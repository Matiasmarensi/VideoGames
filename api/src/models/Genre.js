const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "genre",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.ENUM("Action", "Adventure", "RPG", "Shooter"),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
