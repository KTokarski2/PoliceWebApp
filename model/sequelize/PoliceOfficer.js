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
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2,50],
                msg: "Pole powinno zawierać od 2 do 50 znaków"
            },
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2,50],
                msg: "Pole powinno zawierać od 2 do 50 znaków"
            },
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Należy podać hasło"
            },
            len: {
                args: [2, 10000],
                msg: "Pole powinno zawierać od 2 do 50 znaków"
            }
        }
    },
    rank: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            notContains: {
                args: '-- Wybierz stopień --',
                msg: "Należy wybrać stopień"
            }

        }
    },
    department: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2,50],
                msg: "Pole powinno zawierać od 2 do 50 znaków"
            },
        }
    },
    salary: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [4,7],
                msg: "Pole powinno zawierać od 4 do 8 cyfr"
            },
            min: {
                args: [0],
                msg: "Pole nie może przyjmować wartości ujemnych"
            },
            isNumeric: {
                msg: "Pole powinno być liczbą"
            }
        }
    }
});

module.exports = PoliceOfficer;