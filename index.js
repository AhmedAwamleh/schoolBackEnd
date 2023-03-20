'use strict'
require('dotenv').config()
const server = require('./server');
const { db } = require('./models/index')

db.sync().then(() => {
  server.start(process.env.PORT || 3000)

}).catch(console.error)
// { force: true }

// {
// "subject":"1",
// "passMark":"50",
// "mark":"",
// "coursId":"1"
// }

// {
//   "username":"user",
//   "email":"user@user.com",
//   "password":"123",
//   "validate":true,
//   "role":"user"
// }