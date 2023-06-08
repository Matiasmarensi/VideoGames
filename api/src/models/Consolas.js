const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "consola",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
