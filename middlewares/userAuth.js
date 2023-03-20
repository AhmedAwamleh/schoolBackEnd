'use strict'
const { User } = require('../models/index')

const checkUser = async (req, res, next) => {
  console.log(req.body)
  try {
    const username = await User.findOne({
      where: {
        username: req.body.username
      }
    })
    if (username) {
      return res.status(409).send('username already taken')
    }

    const email = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (email) {
      return res.status(409).send('email already taken')
    }
    next()

  } catch (e) {
    console.log(e)
  }
}

module.exports = { checkUser }