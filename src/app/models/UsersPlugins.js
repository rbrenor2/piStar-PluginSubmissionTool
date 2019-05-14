module.exports = (sequelize, DataTypes) => {
  const UsersPlugins = sequelize.define('UsersPlugins', {})
  UsersPlugins.associate = models => {
    UsersPlugins.belongsTo(models.User, { foreignKey: 'user_id' })
    UsersPlugins.belongsTo(models.Plugin, { foreignKey: 'plugin_id' })
  }
  return UsersPlugins
}
