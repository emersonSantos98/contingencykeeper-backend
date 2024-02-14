'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class TipoConta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TipoConta.init({
    uuid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
    },
    descricao: DataTypes.STRING(100)
  }, {
    sequelize,
    modelName: 'TipoConta',
    hooks: {
      beforeCreate: (TipoConta, options) => {
        TipoConta.uuid = `Us_${uuidv4()}`;
      }
    },
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
  });
  return TipoConta;
};
