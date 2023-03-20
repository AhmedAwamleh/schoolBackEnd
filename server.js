'use strict'
const express = require('express')
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json())
const userRouter = require('./routes/user.routes')
const coursesRouter = require('./routes/cours.routes')

const http = require('http').createServer(app)
const io = require("socket.io")(http)

app.use(userRouter)
app.use(coursesRouter)





const start = (port) => {
  app.listen(port, () => console.log(`hello from server on ${port}`))
}

app.get('/', (req, res) => res.send("HOME PAGE"))


module.exports = {
  start,
  app
}