const router = require('express').Router();
const bearerAuth = require("../middlewares/bearerAuth")
const { allCours, createCourse, deleteCours, assignCourse, addMark } = require('../controllers/coursControllers')

router.get('/courses', allCours)
router.post('/courses', createCourse)
router.post('/coursesWithoutUser', createCourse)
router.delete('/courses/:id', bearerAuth, deleteCours)
router.post('/assign/:id', assignCourse)
router.put('/addmark/:id', addMark)

module.exports = router
