const getDB = require('../util/database').getDB
const mongodb = require('mongodb')
class Product{
  constructor(title,price,imageUrl,description){
    this.title=title
    this.price=price
    this.imageUrl=imageUrl
    this.description=description
  }
  save(){
    const db = getDB()
    return db.collection('Product').insertOne(this).then(result=>{
      console.log(result)
    }).catch(err=>console.log(err))
  }
  static fetchAll(){
    const db = getDB()
    return db.collection('Product').find().toArray()
    .then(products=>{
      console.log(products)
      return products
    }).catch(err=>console.log(err))
  }
  static fetchById(prodId){
    const db = getDB()
    return db.collection('Product').find({_id: new mongodb.ObjectId(prodId)}).next()
    .then(product=>{
      console.log(product)
      return product
    }).catch(err=>console.log(err))
  }
}

module.exports = Product