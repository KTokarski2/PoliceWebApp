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
                msg: "error.required"
            },
            len: {
                args: [2,50],
                msg: "error.length"
            },
        }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [0, 100],
                msg: "error.length100"
            },
        }
    },
    startingDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "error.required"
            },
            isDate: {
                msg: "error.isDate"
            },
            isBefore: {
                args: gtd(),
                msg: "error.futDate"
            },

        }
    },
    closingDate: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
            isBefore: {
                args: gtd(),
                msg: "error.futDate"
            },
            isAfterStartingDate: function (closingDate) {
                if (closingDate != null) {
                    if (this.startingDate > endingDate) {
                        throw new Error("error.aftDate");
                    }
                }
            }
        },
    },
});

module.exports = Case;