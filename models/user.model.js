
'user strict'
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    validate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    token: {
      type: DataTypes.VIRTUAL,
      get: function () {
        return jwt.sign({
          email: this.email
        }, process.env.JWT_SECRET)
      },
      set(tokenObj) {
        return jwt.sign(tokenObj, process.JWT_SECRET)
      }
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user'
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get: function () {
        const acl = {
          admin: ['read', 'create', 'delete', 'update'],
          user: ['read', 'create'],
        }
        return acl[this.role]
      }
    }
  });

  User.authenticateToken = token => {

    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return err;
      } else {
        return decoded
      }
    })

  }
  return User
}



//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3QiLCJpYXQiOjE2Nzg2NTYwNDN9.ZBCVf7SfGndfKf8bC74J-SePTI3z8PHpZiNNd5tS
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3QiLCJpYXQiOjE2Nzg2NTYxMTd9.NXdv2DsJH6oYF-Nm5MftfWriwNc8rvLHyrwfr3yHED0