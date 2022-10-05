const { Product } = require("../entity/product.entity");
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
    if (!dataSourceInitialised) await initDataSources();

    const getDbQuery = require('../misc/getDbQuery');
    const { dbQuery, dbQueryObject } = getDbQuery(req);

    res.setHeader('Content-disposition', 'attachment; filename=result.csv');
    res.setHeader('Content-type', 'text/csv');

    try {
        const stream = await myDataSource
            .getRepository(Product)
            .createQueryBuilder('product')
            .where(dbQuery, dbQueryObject)
            .stream()

        stream.pipe(through2.obj(function (chunk, _, _c) {
            const result = JSON.stringify(chunk);
            this.push(result)

            _c();
        })).pipe(json2csv).pipe(res)

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
                res.status(200).end();
            })

    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log('error fetching Data:', err)
    }

}