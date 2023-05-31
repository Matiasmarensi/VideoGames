const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("videogame", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    created: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    image: {
      type: DataTypes.STRING,
    },
    releaseDate: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 10,
      },
    },
  });
};
