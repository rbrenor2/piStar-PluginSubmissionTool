const { User } = require('./User')

module.exports = (sequelize, DataTypes) => {
  const Plugin = sequelize.define('Plugin', {
    name: DataTypes.STRING,
    short_description: DataTypes.STRING,
    long_description: DataTypes.STRING,
    main_author: DataTypes.STRING,
    references: DataTypes.STRING,
    homepage_link: DataTypes.STRING,
    keywords: DataTypes.STRING
  })

  // Associations
  Plugin.associate = models => {
    Plugin.belongsToMany(models.User, { through: 'UserPlugin' })
  }

  return Plugin
}
