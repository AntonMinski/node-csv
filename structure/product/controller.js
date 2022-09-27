module.exports = (products) => {

        // ADD ITEMS
    // products.create(
    //     {
    //         title: "Samsung S8",
    //         class: "high",
    //         manufacturer: "Samsung",
    //         country: "South Korea",
    //         release_date: "2018-03-15",
    //         price: 7500,
    //     }).then(res => {
    //     console.log(res)
    // }).catch((error) => {
    //     console.error('Failed to create a new record : ', error);
    // });

        // RETRIEVE
    products.findAll().then(res => {
        console.log(res)
    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);
    });

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