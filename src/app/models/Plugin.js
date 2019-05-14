module.exports = (sequelize, DataTypes) => {
  const Plugin = sequelize.define('Plugin', {
    name: DataTypes.STRING,
    short_description: DataTypes.STRING,
    long_description: DataTypes.STRING,
    homepage_link: DataTypes.STRING,
    category: DataTypes.STRING,
    reference: DataTypes.STRING,
    file_link: DataTypes.STRING
  })

  Plugin.associate = models => {
    Plugin.hasMany(models.Review, {
      foreign_key: 'plugin_id'
    })
  }

  return Plugin
}
