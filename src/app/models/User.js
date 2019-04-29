const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      full_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      is_business: DataTypes.BOOLEAN,
      is_university: DataTypes.BOOLEAN,
      institution_name: DataTypes.STRING,
      role: DataTypes.STRING
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            console.log('pass: ' + user.password)
            user.password_hash = await bcrypt.hash(user.password, 8)
            console.log('hash: ' + user.password_hash)
          }

          if (user.is_university === 'on') {
            user.is_university = true
          } else {
            user.is_university = false
          }

          if (user.is_business === 'on') {
            user.is_business = true
          } else {
            user.is_business = false
          }
        }
      }
    }
  )

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash)
  }

  return User
}
