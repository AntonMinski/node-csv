const sequelizeStream = require('node-sequelize-stream');
const defaultBatchSize = 50;
const isObjectMode = true;

module.exports = (sequelize, products) => {
    sequelizeStream(sequelize, defaultBatchSize, isObjectMode);

    const stream = products.findAllWithStream({});
    const res = () => console.log('now');
    stream.pipe(res());


    // // RETRIEVE
    // products.findAll().then(res => {
    //     console.log(res)
    // }).catch((error) => {
    //     console.error('Failed to retrieve data : ', error);
    // });

    // DELETE
    // products.destroy({
    //     where: {
    //         id: 5
    //     }
    // }).then(() => {
    //     console.log("Successfully deleted record.")
    // }).catch((error) => {
    //     console.error('Failed to delete record : ', error);
    // });

}