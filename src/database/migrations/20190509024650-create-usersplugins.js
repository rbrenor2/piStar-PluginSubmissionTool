'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users_plugins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE', //! If the id on Users table changes, it changes here too
        onDelete: 'CASCADE', //! If a User is removed, all users_plugins pointing to him are deleted too.
        allowNull: false
      },
      plugin_id: {
        type: Sequelize.INTEGER,
        references: { model: 'plugins', key: 'id' },
        onUpdate: 'CASCADE', //! If the id on Plugins table changes, it changes here too
        onDelete: 'CASCADE', //! If a User is removed, all users_plugins pointing to him are deleted too.
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
    return queryInterface.dropTable('users_plugins')
  }
}
