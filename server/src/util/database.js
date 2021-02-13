const Sequelize = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(
    config.db.DB,
    config.db.USER,
    config.db.PASSWORD,
    {
        host: config.db.HOST,
        dialect: config.db.dialect,
        operatorsAliases: false,
        pool: {
            max: config.db.max,
            min: config.db.min,
            acquire: config.db.acquire,
            idle: config.db.idle
        }
    }
);

module.exports = sequelize;
