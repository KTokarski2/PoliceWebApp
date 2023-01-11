const gtd = require('../utils/generateTodayDate');
const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');



const Case = sequelize.define('Case', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
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
    description: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [0, 100],
                msg: "Pole powinno zawierać od 0 do 100 znaków"
            },
        }
    },
    startingDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isDate: {
                msg: "Pole powinno być datą"
            },
            isBefore: {
                args: gtd(),
                msg: "Data nie może być z przyszłości"
            },
        }
    },
    closingDate: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
            isBefore: {
                args: gtd(),
                msg: "Data nie może być z przyszłości"
            }
        },
    }
});

module.exports = Case;