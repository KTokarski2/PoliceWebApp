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
                msg: "error.required"
            },


        }
    },
    Case_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "error.required"
            }
        }
    },
    startingDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "error.required"
            },
            isBefore: {
                args: gtd(),
                msg: "error.futDate"
            },
        }
    },
    endingDate: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
            isBefore: {
                args: gtd(),
                msg: "error.futDate"
            },
            isAfterDate: function (endingDate) {
                if (endingDate != null) {
                    if (this.startingDate > endingDate) {
                        throw new Error("error.aftDate");
                    }
                }
            }
        }
    },
    actionTaken: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "error.required"
            },
            len: {
                args: [0,100],
                msg: "error.length100"
            }
        }
    }
});

module.exports = Participation;