module.exports = (sequelize, DataTypes) => {
  const Plugin = sequelize.define('Plugin', {
    name: DataTypes.STRING,
    short_description: DataTypes.STRING,
    long_description: DataTypes.STRING,
    homepage_link: DataTypes.STRING,
    category: DataTypes.STRING,
    reference: DataTypes.STRING,
    svgs: DataTypes.STRING,
    published: DataTypes.BOOLEAN,
    constraints: DataTypes.STRING,
    metamodel: DataTypes.STRING,
    shapes: DataTypes.STRING,
    uimetamodel: DataTypes.STRING,
    use_count: DataTypes.STRING
  })

  Plugin.associate = models => {
    Plugin.hasMany(models.Review, {
      foreign_key: 'plugin_id'
    })
  }

  return Plugin
}
