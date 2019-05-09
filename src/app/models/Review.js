module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    rating: DataTypes.INTEGER
  })

  Review.associate = models => {
    Review.belongsTo(models.Plugin, {
      foreign_key: 'plugin_id'
    })
  }
  return Review
}
