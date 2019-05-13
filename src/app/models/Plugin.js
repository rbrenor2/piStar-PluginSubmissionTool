module.exports = (sequelize, DataTypes) => {
  const Plugin = sequelize.define('Plugin', {
    name: DataTypes.STRING,
    keywords: DataTypes.VIRTUAL,
    authors_emails: DataTypes.VIRTUAL,
    short_description: DataTypes.STRING,
    long_description: DataTypes.STRING,
    homepage_link: DataTypes.STRING,
    category: DataTypes.STRING,
    status: DataTypes.STRING,
    file_link: DataTypes.STRING
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
      through: models.PluginsKeywords,
      foreign_key: 'plugin_id'
    })
  }

  return Plugin
}
