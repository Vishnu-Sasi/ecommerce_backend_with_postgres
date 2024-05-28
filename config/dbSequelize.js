const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('postgressql_ecommerce', 'trainingdb_user', 'upcodedb', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
});

sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established successfully");
    })
    .catch((err) => {
        console.log("Unable to connect to database", err);
    });

module.exports = sequelize;