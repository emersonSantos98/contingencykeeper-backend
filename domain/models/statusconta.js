'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class StatusConta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StatusConta.init({
    uuid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
    },
    descricao: {
      type: DataTypes.STRING(50)
    },
  }, {
    sequelize,
    modelName: 'StatusConta',
    hooks: {
      beforeCreate: (StatusConta, options) => {
        StatusConta.uuid = `Us_${uuidv4()}`;
      }
    },
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
  });
  return StatusConta;
};
