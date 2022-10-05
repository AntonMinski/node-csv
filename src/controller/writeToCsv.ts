const { createWriteStream } = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, '../..');

const { Product } = require("../entity/product.entity");
const through2 = require('through2');

// CSV MODULE
const { Transform } = require('json2csv');
const filename = "result.csv";
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

// DATABASE
import { myDataSource } from "../../db"
let dataSourceInitialised = false;
function initDataSources() {
    return myDataSource
        .initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
            dataSourceInitialised = true;
        })
        .catch((err) => {
            console.error("Error during Data Source initialization:", err)
        });
}

module.exports = async (req, res) => {

    const getDbQuery = require('./getDbQuery');
    const { dbQuery, dbQueryObject } = getDbQuery(req);

    if (!dataSourceInitialised) await initDataSources();

    const writeOutput = createWriteStream(filename, { encoding: 'utf8' });

    writeOutput
        .on('finish', () => {
            console.log('finish');
            const options = {
                root: filePath
            }
            res.sendFile(filename, options);
        })
        .on('error', (error) => {
            console.error('Failed to retrieve data :', error)
            res.send(error);
        });

    try {
        const stream = await myDataSource
            .getRepository(Product)
            .createQueryBuilder('product')
            .where(dbQuery, dbQueryObject)
            .stream()

        stream.pipe(through2.obj(function (chunk, _, _c) {
            console.log('chunk', chunk);
            const result = JSON.stringify(chunk);
            console.log('result', result);
            this.push(result)

            _c();
        })).pipe(json2csv).pipe(writeOutput)

        stream
            .on('data', (data) => {
                console.log('data', data);
            })
            .on('error', (error) => {
                console.error('Failed to retrieve data :', error)
                res.send(error);
            })
            .on('end', () => {
                console.log('end');
            })

    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log('error fetching Data:', err)
    }

}