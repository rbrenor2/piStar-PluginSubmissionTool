module.exports = (sequelize, DataTypes) => {
  const Keyword = sequelize.define('Keyword', {
    title: DataTypes.STRING
  })

  Keyword.associate = models => {
    Keyword.belongsToMany(models.Plugin, {
      trough: models.PluginsKeywords,
      foreign_key: 'keyword_id'
    })
  }

  return Keyword
}
