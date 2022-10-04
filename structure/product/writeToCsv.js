const { createWriteStream } = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, '../..');

const { Product } = require("../entity/product.entity");

const { Transform } = require('json2csv');
const through2 = require('through2');
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

// const getQuery = (req) => {
//     let filter = []
//
//     const getPriceFilter = (key, value) => {
//         // get first position of number
//         const index = value.match(/\d/).index;
//
//         // split string into sign and number
//         const signStr = value.slice(0, index) || 'eq';
//         const numberStr = value.slice(index);
//
//         return {signStr, numberStr}
//     }
//
//     Object.entries(req.query).map(([key, value], number) => {
//         if (key !== 'price') {
//             filter.push({ [key]: value});
//         }
//         else {
//             const {signStr, numberStr} = getPriceFilter(key, value);
//             filter.push({ price: {[Op[`${signStr}`]]: numberStr}});
//         }
//     })
//     return filter;
// };

module.exports = async (myDataSource, req, res) => {

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
        const stream = await myDataSource.getRepository(Product).createQueryBuilder('product').stream()

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