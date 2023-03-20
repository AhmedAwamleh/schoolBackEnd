'use strict';
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const User = require('../models/index').User;
const Cours = require("../models/index").Cours
const signup = async (req, res) => {
  try {
    const { username, email, password, validate, role } = req.body;
    const data = {
      username,
      email,
      password: await bcrypt.hash(password, 10),
      validate,
      role
    };

    const user = await User.create(data);
    if (user) {
      res.status(201).json(user);
    }
  } catch (error) {
    console.log(error);
  }
};
const signin = async (req, res) => {
  const basicHeader = req.headers.authorization.split(' ');
  const encodedValue = basicHeader.pop();
  const decodedValue = base64.decode(encodedValue);

  const [email, password] = decodedValue.split(':');

  const user = await User.findOne({ where: { email } });
  if (user) {
    const isSame = await bcrypt.compare(password, user.password)
    if (isSame) {
      res.status(200).json(user)
    } else {
      return res.status(401).json('you are noth outhorized')
    }
  } else {
    return res.status(401).send('you are not outhorized')
  }
}

const getUser = async (req, res) => {
  const id = req.params.id;
  console.log(id)
  try {
    const user = await User.findOne({
      where: { id: id },
      include: Cours
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
}

const allUser = async (req, res) => {
  const users = await User.findAll({ include: Cours })
  res.status(200).json(users)
}

const deleteUser = async (req, res) => {


  const id = req.params.id;
  console.log(id)
  if (!req.user.capabilities.includes('delete')) {
    return res.status(401).json({ message: 'only admin can delete' })
  }
  const userId = req.params.id;
  const user = await User.findByPk(userId);
  const deleteUser = await User.destroy({ where: { id } });
  if (!user) {
    // User not found, send 404 Not Found status
    res.sendStatus(404);
    return;
  }
  await user.destroy();
  res.sendStatus(204);
}

const editUser = async (req, res) => {
  const id = req.params.id;

  const { username, email, active } = req.body;
  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.email = email;
    user.username = username;
    user.active = active;

    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'this email allready use' });
  }


}

const getUsersBySubject = async (req, res) => {
  try {
    const { subject } = req.query;
    const users = await User.findAll({
      include: {
        model: Cours,
        where: { subject: subject }
      }
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { signup, allUser, signin, getUser, deleteUser, editUser, getUsersBySubject }