'use strict'

const { User } = require('../models/index');

const Cours = require('../models/index').Cours;

const allCours = async (req, res) => {
  try {
    const cours = await Cours.findAll({ include: User });
    res.status(200).json(cours)
  } catch (error) {
    console.log(error)
  }
}

const createCourse = async (req, res, next) => {
  console.log(req.body)
  const { subject, passMark, courseId } = req.body;

  let data = {
    subject,
    passMark,
    courseId
  };
  try {
    const course = await Cours.create(data);

    res.status(201).json(course);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const assignCourse = async (req, res, next) => {
  console.log(req.body);
  const { subject, courseId, userId } = req.body;
  const data = {
    subject,
    courseId,
    userId
  }
  try {
    const user = await User.findOne({ where: { id: userId } });
    const course = await Cours.create(data);

    await user.addCourse(course);


    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
}


// const createCourse = async (req, res) => {
//   try {
//     const data = req.body;
//     const course = await Course.create(data);
//     res.status(201).send(course);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Error creating course');
//   }
// }
const deleteCours = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.user.capabilities.includes('delete')) {
      return res.status(401).json({ message: 'only admin can delete' })
    }
    const deleteCourss = await Cours.destroy({ where: { id } });
    res.status(409).json({ message: 'Cours has been deleted' })
  } catch (error) {
    console.log(error)
  }
}


const addMark = async (req, res) => {
  try {
    const id = req.params.id
    const { courseId, mark } = req.body
    const cours = await Cours.findOne({ where: { id } });
    if (!cours) {
      return res.status(404).json({ message: 'User not found' });
    }
    cours.courseId = courseId,
      cours.mark = mark
    await cours.save();
    res.json(cours);
  } catch (error) {
    console.log(error)

  }

}


module.exports = { allCours, createCourse, deleteCours, assignCourse, addMark }