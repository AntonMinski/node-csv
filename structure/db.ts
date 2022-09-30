// const {Sequelize, DataTypes} = require("sequelize");
//
// const sequelize = new Sequelize(
//     'node_csv',
//     'admin',
//     '1111',
//     {
//         host: 'localhost',
//         dialect: 'mysql'
//     }
// );
//
// const initProducts = require('./product/model.js');
//
// module.exports = async () => {
//
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//
//         const products = await initProducts(sequelize, DataTypes);
//
//         return {sequelize, products};
//     }
//     catch (error) {
//         console.error('Unable to connect to the database: ', error);
//     }
// };


const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "admin",
    password: "1111",
    database: "node_csv",
    entities: ["src/entity/*.js"],
    logging: true,
    synchronize: true,
})

module.exports = myDataSource;
