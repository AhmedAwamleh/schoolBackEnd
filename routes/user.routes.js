'use strict'
const router = require('express').Router();
const { checkUser } = require('../middlewares/userAuth')
const { signup, allUser, signin, getUser, deleteUser, editUser, getUsersBySubject } = require('../controllers/userControllers')
const bearerAuth = require("../middlewares/bearerAuth")

router.post('/signIn', signin)
router.get('/users', bearerAuth, allUser)
router.post('/signUp', checkUser, signup)
router.get('/users/:id', getUser)
router.delete('/users/:id', bearerAuth, deleteUser)
router.put('/users/:id', editUser)
router.get('/getUsersBySubject', getUsersBySubject);


module.exports = router