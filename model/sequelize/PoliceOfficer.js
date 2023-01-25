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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "error.required"
            },
            len: {
                args: [2,50],
                msg: "error.length"
            },
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "error.required"
            },
            len: {
                args: [2,50],
                msg: "error.length"
            },
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "error.password"
            },
            len: {
                args: [1, 100],
                msg: "error.required"
            }
        }
    },
    rank: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "error.required"
            },
            notContains: {
                args: '-- Wybierz stopień --',
                msg: "error.rank"
            }

        }
    },
    department: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "error.required"
            },
            len: {
                args: [2,50],
                msg: "error.length"
            },
        }
    },
    salary: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "error.required"
            },
            len: {
                args: [4,7],
                msg: "error.numberLength"
            },
            min: {
                args: [0],
                msg: "error.positive"
            },
            isNumeric: {
                msg: "error.numeric"
            }
        }
    }
});

module.exports = PoliceOfficer;