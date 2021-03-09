'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.STRING
      },
      chat_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Chats",
            schema: "public"
          },
          key:'id'
        },
        allowNull:false
      },
      sender_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users",
            schema: "public"
          },
          key: 'id'
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
    await queryInterface.dropTable('Messages');
  }
};