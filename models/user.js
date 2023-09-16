const getDB = require('../util/database').getDB
const mongodb = require('mongodb')
class User{
    constructor(name,email,cart,id){
        this.name=name
        this.email=email
        this.cart=cart
        this._id=id
    }
    save(){
        const db = getDB()
        return db.collection('users').insertOne(this)
    }
    addToCart(product){
        const updatedCart = {item:[{...product,quantity:1}]}
        const db = getDB()
        return db.collection('users')
        .updateOne({_id:new mongodb.ObjectId(this._id)},{$set:{cart:updatedCart}})
    }
    static findById(userId){
        const db = getDB()
        return db.collection('users').findOne({_id:new mongodb.ObjectId(userId)})
    }
}

module.exports = User