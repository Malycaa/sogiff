'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imageURL: {
        type: Sequelize.STRING,
        allowNull: false

      },
      like: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      unlike: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        }
      },
      caption: {
        type: Sequelize.TEXT,
        allowNull: false,
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
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Posts');
  }
};