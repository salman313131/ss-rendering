const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  imageUrl:{
    type: String,
    required: true
  },
  userId:{
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
})
// const getDB = require('../util/database').getDB
// const mongodb = require('mongodb')
// class Product{
//   constructor(title,price,imageUrl,description,id,userId){
//     this.title=title
//     this.price=price
//     this.imageUrl=imageUrl
//     this.description=description
//     this._id=id,
//     this.userId=userId
//   }
//   save(){
//     const db = getDB()
//     let dbOp;
//     if(this._id){
//       dbOp=db.collection('Product').updateOne({_id: this._id},{$set:this})
//     }else{
//       dbOp=db.collection('Product').insertOne(this)
//     }
//     return dbOp.then(result=>{
//       console.log(result)
//     }).catch(err=>console.log(err))
//   }
//   static fetchAll(){
//     const db = getDB()
//     return db.collection('Product').find().toArray()
//     .then(products=>{
//       console.log(products)
//       return products
//     }).catch(err=>console.log(err))
//   }
//   static fetchById(prodId){
//     const db = getDB()
//     return db.collection('Product').find({_id: new mongodb.ObjectId(prodId)}).next()
//     .then(product=>{
//       console.log(product)
//       return product
//     }).catch(err=>console.log(err))
//   }
//   static delete(prodId){
//     const db = getDB()
//     return db.collection('Product').deleteOne({_id: new mongodb.ObjectId(prodId)})
//     .then(result=>{
//       console.log('deleted')
//     }).catch(err=>console.log(err))
//   }
// }

module.exports = mongoose.model('Products',productSchema)