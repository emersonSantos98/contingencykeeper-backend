'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      uuid: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255)
      },
      email: {
        type: Sequelize.STRING(255)
      },
      hash_password: {
        type: Sequelize.STRING(255)
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

    // Verifica se o gatilho já existe antes de criá-lo
    const [results] = await queryInterface.sequelize.query(`
      SHOW TRIGGERS LIKE 'set_uuid_default';
    `);
    if (results.length > 0) {
      await queryInterface.sequelize.query(`
        CREATE TRIGGER set_uuid_default 
        BEFORE INSERT ON Users
        FOR EACH ROW 
        SET NEW.uuid = CONCAT('Us_', UUID());
      `);
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS set_uuid_default;
    `);

    await queryInterface.dropTable('Users');
  }
};
