'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Chats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user1_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users",
            schema: "public",
          },
          key: "id"
        }
      },
      user2_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName:"Users",
            schema: "public"
          },
          key:"id"
        }
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Chats');
  }
};