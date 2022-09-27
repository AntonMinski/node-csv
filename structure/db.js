const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize(
    'node_csv',
    'admin',
    '1111',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

const initProducts = require('./product/model.js');
const initProductController = require('./product/controller.js');
const readStream = require('./product/readStream.js');

module.exports = async () => {

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        const products = await initProducts(sequelize, DataTypes);

        readStream(sequelize, products);

        // await initProductController(sequelize, products);

    }
    catch (error) {
        console.error('Unable to connect to the database: ', error);
    }


};
