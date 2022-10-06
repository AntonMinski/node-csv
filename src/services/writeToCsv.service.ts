const through2 = require('through2');

// CSV MODULE
const { Transform } = require('json2csv');
const columns = [
    "id",
    "title",
    "class",
    "manufacturer",
    "country",
    "release_date",
    "price",
];
const opts = { columns, header: true };
const transformOpts = { highWaterMark: 8192, encoding: 'utf-8' };
const json2csv = new Transform(opts, transformOpts);


async function writeToCsv (myDataSource, Product, query, res) {

    const getDbQuery = require('./getDbQuery.service');
    const {dbQuery, dbQueryObject} = getDbQuery(query);

    const stream = await myDataSource
        .getRepository(Product)
        .createQueryBuilder('product')
        .where(dbQuery, dbQueryObject)
        .stream()

    const exportStream = stream.pipe(through2.obj(function (chunk, _, _c) {
        const result = JSON.stringify(chunk);
        console.log(result);
        this.push(result)

        _c();
    })).pipe(json2csv)

    return exportStream
}

module.exports = writeToCsv;

