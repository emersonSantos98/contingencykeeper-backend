'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuario.init({
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(255)
    },
    email: {
      type: DataTypes.STRING(255)
    },
    hash_senha: {
      type: DataTypes.STRING(255)
    },
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    hooks: {
      beforeCreate: (usuario, options) => {
        usuario.uuid = 'Us_' + uuidv4();
      }
    },
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
  });
  return Usuario;
};
