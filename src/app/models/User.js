module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    is_business: DataTypes.BOOLEAN,
    is_university: DataTypes.BOOLEAN,
    institution_name: DataTypes.STRING,
    role: DataTypes.STRING
  })

  return User
}
