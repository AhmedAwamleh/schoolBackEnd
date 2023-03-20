'use strict'

module.exports = (sequelize, DataTypes) => {
  'use strict'
  const courses = sequelize.define('courses', {
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    passMark: {
      type: DataTypes.STRING,
      allowNull: true,

    },
    mark: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ""
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }
  );
  return courses
}
