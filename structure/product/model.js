module.exports = async (sequelize, DataTypes) => {
    const products = await sequelize.define("products", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        class: {
            type: DataTypes.STRING,
            allowNull: true
        },
        manufacturer: {
            type: DataTypes.STRING,
            allowNull: true
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true
        },
        release_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    try {
        await sequelize.sync();
        console.log('Products table created successfully!');
    } catch (error) {
        console.error('Unable to create table : ', error);
    }

    return products;
};