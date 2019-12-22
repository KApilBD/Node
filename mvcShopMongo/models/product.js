const getDb = require('../util/database').getDb;

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        // this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    save() {
        const db = getDb();
        return db.collection('products')
            .insertOne(this)
            .then(result => {
                console.log("Result", result);
            })
            .catch(err => {
                console.log(err)
            });
    }
    static fetchAll() {
        const db = getDb();
        return db.collection('peoducts')
            .find()
            .toArray()
            .then(products => {
                console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err)
            });
    }
    // static findById(id, cb) {
    //     getProductsFromFile(products => {
    //         const product = products.find(p => p.id === id);
    //         cb(product);
    //     })
    // }
    // static deleteById(id) {
    //     getProductsFromFile(products => {
    //         const product = products.find(prod => prod.id === id);
    //         const updatedProducts = products.filter(p => p.id !== id);
    //         fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //             if (!err) {
    //                 Cart.deleteProduct(id, product.price);
    //             }
    //         });
    //     });

    // }
};