/*
const sequelizeStream = require('node-sequelize-stream');
const { Op } = require("sequelize");
const fs = require('fs');
const through2 = require('through2');
const { stringify } = require("csv-stringify");

const defaultBatchSize = 100;
const isObjectMode = true;

const filename = "result.csv";
const writableStream = fs.createWriteStream(filename);

const columns = [
    "title",
    "class",
    "manufacturer",
    "country",
    "release_date",
    "price",
];

const getQuery = (req) => {
    let filter = []

    const getPriceFilter = (key, value) => {
        // get first position of number
        const index = value.match(/\d/).index;

        // split string into sign and number
        const signStr = value.slice(0, index) || 'eq';
        const numberStr = value.slice(index);

        return {signStr, numberStr}
    }

    Object.entries(req.query).map(([key, value], number) => {
        if (key !== 'price') {
            filter.push({ [key]: value});
        }
        else {
            const {signStr, numberStr} = getPriceFilter(key, value);
            filter.push({ price: {[Op[`${signStr}`]]: numberStr}});
        }
    })
    return filter;
};

const stringifier = stringify({ header: true, columns: columns });

module.exports = ({sequelize, products}, req, res) => {
    sequelizeStream(sequelize, defaultBatchSize, isObjectMode);
    const filter = getQuery(req);
    console.log('filter', filter);

    const stream = products.findAllWithStream({
        where: {
            [Op.and]: filter
        }
    });
    stream.pipe(through2.obj(function (chunk, _, _c) {
        console.log('chunk', chunk);
        stringifier.write(chunk);

        _c();
    }))
        .on('data', () => {
        })
        .on('error', (error) => {
            console.error('Failed to retrieve data :', error)
            res.send(error);
        })
        .on('end', () => {
            stringifier.pipe(writableStream);
            res.send('finished writing to csv');
        })
}
 */