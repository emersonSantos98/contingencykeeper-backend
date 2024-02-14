'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Conta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
         Conta.belongsTo(models.User, {
            foreignKey: 'usuario_uuid',
            as: 'usuario'
        });
         models.User.hasMany(Conta, {
            foreignKey: 'usuario_uuid',
            as: 'contas'
        });
        Conta.belongsTo(models.TipoConta, {
            foreignKey: 'tipo_conta_uuid',
            as: 'tipo_conta'
        });
        models.TipoConta.hasMany(Conta, {
            foreignKey: 'tipo_conta_uuid',
            as: 'contas'
        });
        Conta.belongsTo(models.StatusConta, {
            foreignKey: 'status_conta_uuid',
            as: 'status_conta'
        });
        models.StatusConta.hasMany(Conta, {
            foreignKey: 'status_conta_uuid',
            as: 'contas'
        });


    }
  }
  Conta.init({
    uuid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
    },
    usuario_uuid: {
      type: DataTypes.STRING(255),
      references: {
        model: 'User',
        key: 'uuid'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    nome_conta: {
      type: DataTypes.STRING(255)
    },
    usuario_conta: {
      type: DataTypes.STRING(255)
    },
    senha_conta: {
      type: DataTypes.STRING(255)
    },
    tipo_conta_uuid: {
      type: DataTypes.STRING(255),
      references: {
        model: 'TipoConta',
        key: 'uuid'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    status_conta_uuid: {
      type: DataTypes.STRING(255),
      references: {
        model: 'StatusConta',
        key: 'uuid'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },

  }, {
    sequelize,
    modelName: 'Conta',
    hooks: {
      beforeCreate: (Conta, options) => {
        Conta.uuid = `Us_${uuidv4()}`;
      }
    },
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
  });
  return Conta;
};
