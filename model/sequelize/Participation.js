const gtd = require('../utils/generateTodayDate');
const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Participation = sequelize.define('Participation', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    PoliceOfficer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    Case_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    startingDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isBefore: {
                args: gtd(),
                msg: "Data nie może być z przyszłości"
            },
        }
    },
    endingDate: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
            isBefore: {
                args: gtd(),
                msg: "Data nie może być z przyszłości"
            }
        }
    },
    actionTaken: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [2,100],
                msg: "Pole powinno zawierać od 2 do 100 znaków"
            }
        }
    }
});

module.exports = Participation;