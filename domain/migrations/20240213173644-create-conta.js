'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Conta', {
      uuid: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
      usuario_uuid: {
        type: Sequelize.STRING(255),
        references: {
          model: 'users',
          key: 'uuid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nome_conta: {
        type: Sequelize.STRING(255)
      },
      usuario_conta: {
        type: Sequelize.STRING(255)
      },
      senha_conta: {
        type: Sequelize.STRING(255)
      },
      tipo_conta_uuid: {
        type: Sequelize.STRING(255),
        references: {
          model: 'TipoConta',
          key: 'uuid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status_conta_uuid: {
        type: Sequelize.STRING(255),
        references: {
          model: 'StatusConta',
          key: 'uuid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Verifica se o gatilho já existe antes de criá-lo
    const [results] = await queryInterface.sequelize.query(`
      SHOW TRIGGERS LIKE 'set_uuid_default';
    `);
    if (results.length > 0) {
      await queryInterface.sequelize.query(`
        CREATE TRIGGER set_uuid_default 
        BEFORE INSERT ON Conta
        FOR EACH ROW 
        SET NEW.uuid = CONCAT('Us_', UUID());
      `);
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS set_uuid_default;
    `);

    await queryInterface.dropTable('Conta');
  }
};
