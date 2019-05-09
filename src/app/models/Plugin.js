module.exports = (sequelize, DataTypes) => {
  const Plugin = sequelize.define('Plugin', {
    name: DataTypes.STRING,
    short_description: DataTypes.STRING,
    long_description: DataTypes.STRING,
    homepage_link: DataTypes.STRING
  })

  Plugin.associate = models => {
    Plugin.belongsToMany(models.User, {
      through: models.UsersPlugins,
      foreign_key: 'plugin_id'
    })
    Plugin.hasMany(models.Review, {
      foreign_key: 'plugin_id'
    })
    Plugin.belongsToMany(models.Keyword, {
      trough: models.PluginsKeyword,
      foreign_key: 'plugin_id'
    })
  }

  return Plugin
}
