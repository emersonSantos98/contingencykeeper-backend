'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    uuid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255)
    },
    email: {
      type: DataTypes.STRING(255)
    },
    hash_password: {
      type: DataTypes.STRING(255)
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
      beforeCreate: (user, options) => {
        user.uuid = `Us_${uuidv4()}`;
      }
    },
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
  });
  return User;
};
