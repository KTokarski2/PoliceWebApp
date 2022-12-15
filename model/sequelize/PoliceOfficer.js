const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const PoliceOfficer = sequelize.define('PoliceOfficer', {
    _id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rank: {
        type: Sequelize.STRING,
        allowNull: false
    },
    department: {
        type: Sequelize.STRING,
        allowNull: false
    },
    salary: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
    }
});

module.exports = PoliceOfficer;