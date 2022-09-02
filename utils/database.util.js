const { Sequelize, DataTypes } = require('sequelize');

// Configure sequelize database connection
const db = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'hoshi',
    port: 5432,
    database: 'check-in-check-out',
    logging: false,
});

module.exports = { db, DataTypes };
