function getDbQuery(req) {
    let dbQuery = "";
    const dbQueryObject = {};

    const getPriceFilter = (value) => {
        // get first position of number
        const index = value.match(/\d/).index;

        // split string into sign and number
        const signStr = value.slice(0, index) || '=';
        const numberStr = value.slice(index);

        return {signStr, numberStr}
    }

    Object.entries(req.query).map(([key, value], index) => {
        dbQuery += index === 0 ? `` : ` AND `;

        if (key === 'price') {
            const {signStr, numberStr} = getPriceFilter(value);
            dbQuery += `product.price ${signStr} :price`;
            dbQueryObject['price'] = Number(numberStr);
        }
        else {
            dbQuery += `product.${key} = :${key}`;
            dbQueryObject[key] = value;
        }
    })

    return {dbQuery, dbQueryObject};

}

module.exports = getDbQuery;