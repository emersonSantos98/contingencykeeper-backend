'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StatusConta', {
      uuid: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
      descricao: {
        type: Sequelize.STRING(50)
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Verifica se o gatilho já existe antes de associá-lo à tabela
    const [results] = await queryInterface.sequelize.query(`
      SHOW TRIGGERS LIKE 'set_uuid_default';
    `);
    if (results.length > 0) {
      await queryInterface.sequelize.query(`
        CREATE TRIGGER set_uuid_default 
        BEFORE INSERT ON StatusConta
        FOR EACH ROW 
        SET NEW.uuid = CONCAT('Us_', UUID());
      `);
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS set_uuid_default;
    `);

    await queryInterface.dropTable('StatusConta');
  }
};
