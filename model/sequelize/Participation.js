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
        allowNull: false
    },
    Case_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    startingDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    endingDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    actionTaken: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Participation;