module.exports = (sequelize, DataTypes) => {
  const PluginsKeywords = sequelize.define('PluginsKeywords', {})
  PluginsKeywords.associate = models => {
    PluginsKeywords.belongsTo(models.Plugin, { foreignKey: 'plugin_id' })
    PluginsKeywords.belongsTo(models.Keyword, { foreignKey: 'keyword_id' })
  }
  return PluginsKeywords
}
