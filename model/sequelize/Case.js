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
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    startingDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    closingDate: {
        type: Sequelize.DATE,
        allowNull: true
    }
});

module.exports = Case;