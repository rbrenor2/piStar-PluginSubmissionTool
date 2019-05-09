'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('plugins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      short_description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      long_description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      homepage_link: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    // TODO When in PROD, change to update table, to preserve the old users
    return queryInterface.dropTable('plugins')
  }
}
