'use strict'
const { User } = require("../models");
module.exports = async (req, res, next) => {
  console.log('From inside the middleware');
  if (!req.headers.authorization) (
    next('You are not authorized')
  )

  const token = req.headers.authorization.split(' ').pop();
  try {
    const validUser = User.authenticateToken(token);

    const userInfo = await User.findOne({ where: { email: validUser.email } });
    console.log(userInfo)
    if (userInfo) {
      req.user = userInfo;
      req.token = userInfo.token
      next();
    } else {
      next('Youre not authorized')
    }

  } catch (e) {
    next(e)
  }
}