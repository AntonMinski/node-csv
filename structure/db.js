const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    'node_csv',
    'admin',
    '1111',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = () => {

    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connect to the database: ', error);
    });

}
