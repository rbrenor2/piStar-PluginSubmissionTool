'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      full_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      institution_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password_hash: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      is_business: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        default: false
      },
      is_university: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        default: false
      },
      is_admin: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        default: false
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
    return queryInterface.dropTable('users')
  }
}
