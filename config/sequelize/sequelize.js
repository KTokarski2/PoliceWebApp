const Sequelize = require('sequelize');

const sequelize = new Sequelize('tin-example-sequelize', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost',
    port: '3309'
});

module.exports = sequelize;