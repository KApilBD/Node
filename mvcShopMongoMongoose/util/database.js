require("dotenv").config();

const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const mongoUri = process.env.MFLIX_DB_URI;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(mongoUri,{ useUnifiedTopology: true })
        .then(client => {
            console.log("Connected to MongoDB!!!");
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if(_db){
        return _db;
    }
    throw "No DB Found!"
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
