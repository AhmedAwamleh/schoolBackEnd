'use strict'
const User = require('./user.model')
const Cours = require('./coursesInfo')
const { Sequelize, DataTypes } = require('sequelize')

const POSTGRES_URL = process.env.DATABASE_URL || "postgresql://awamleh:a@localhost:5432/awamleh";



//database
let sequelize = new Sequelize(POSTGRES_URL)
const userModel = User(sequelize, DataTypes)
const coursModel = Cours(sequelize, DataTypes)

//realation
userModel.hasMany(coursModel, { foreignKey: 'courseId', sourceKey: 'id' })
coursModel.belongsTo(userModel, { foreignKey: 'courseId', targetKey: 'id' })

module.exports = {
  db: sequelize,
  User: userModel,
  Cours: coursModel
}  