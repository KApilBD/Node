const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    descriptioon: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
});

// module.exports = class Product {
//     constructor(id, title, imageUrl, description, price, userId) {
//         this._id = id ? new mongodb.ObjectID(id) : null;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.price = price;
//         this.userId = userId;
//     }
//     save() {
//         const db = getDb();
//         let dbOp;
//         if (this._id) {
//             // update product
//             dbOp = db.collection('products')
//                 .updateOne({ _id: this._id }, { $set: this });
//         } else {
//             dbOp = db.collection('products')
//                 .insertOne(this)
//         }
//         return dbOp.then(result => {
//             console.log("Result", result);
//         })
//             .catch(err => {
//                 console.log(err)
//             });
//     }
//     static fetchAll() {
//         const db = getDb();
//         return db.collection('products')
//             .find()
//             .toArray()
//             .then(products => {
//                 return products;
//             })
//             .catch(err => {
//                 console.log(err)
//             });
//     }
//     static findById(id) {
//         const db = getDb();
//         return db.collection('products')
//             .find({ _id: new mongodb.ObjectID(id) })
//             .next()
//             .then(product => {
//                 console.log(product);
//                 return product;
//             })
//             .catch(err => {
//                 console.log(err)
//             });
//     }
//     static deleteById(id) {
//         const db = getDb();
//         return db.collection('products')
//             .deleteOne({ _id: new mongodb.ObjectID(id) })
//             .then(result => {
//                 console.log("Deleted!!")
//             })
//             .catch(err => {
//                 console.log(err)
//             });
//     }
// };