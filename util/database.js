const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

let _db;

const mongoConnect=(cb)=>{
MongoClient.connect('mongodb+srv://jaan:jaankhan786@nodereact.mu2wjrq.mongodb.net/Product?retryWrites=true&w=majority')
.then(client=>{
    console.log('connected')
    _db = client.db()
    cb()
}).catch(err=>{
    console.log(err)
    throw err})
}

const getDB=()=>{
    if(_db){
        return _db
    }
    throw 'No database'
}

exports.mongoConnect = mongoConnect
exports.getDB = getDB