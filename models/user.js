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
        const cartProductIndex = this.cart.item.findIndex(cp=>cp.productId.toString() === product._id.toString())
        let newQuantity=1
        const updatedCartItems = [...this.cart.item]
        if(cartProductIndex>=0){
            newQuantity=this.cart.item[cartProductIndex].quantity+1
            updatedCartItems[cartProductIndex].quantity = newQuantity
        }else{
            updatedCartItems.push({productId:product._id,quantity:newQuantity})
        }
        const updatedCart = {item:updatedCartItems}
        const db = getDB()
        return db.collection('users')
        .updateOne({_id:new mongodb.ObjectId(this._id)},{$set:{cart:updatedCart}})
    }
    getCart(){
        const db = getDB()
        const productsIds = this.cart.item.map(i=>i.productId)
        return db.collection('Product').find({_id:{$in:productsIds}}).toArray().then(product=>{
            return product.map(p=>{
                return {...p,quantity:this.cart.item.find(i=>i.productId.toString()===p._id.toString()).quantity}
            })
        })
    }
    deleteItem(prodId){
        const db = getDB()
        const updatedItem = this.cart.item.filter(i=>i.productId.toString()!==prodId.toString())
        return db.collection('users')
        .updateOne({_id:new mongodb.ObjectId(this._id)},{$set:{cart:{item:updatedItem}}})
    }
    addOrder(){
        const db = getDB()
        return this.getCart().then(products=>{
            const order={
                items : products,
                user:{
                    _id: new mongodb.ObjectId(this._id),
                    name: this.name
                }
            }
            return db.collection('orders').insertOne(order)
        })
        .then(result=>{
            this.cart={item:[]}
            return db.collection('users')
        .updateOne({_id:new mongodb.ObjectId(this._id)},{$set:{cart:{item:[]}}})
        }).catch(err=>console.log(err))
    }
    // getOrder(){
    //     const db = getDB()
    //     return db.collection('orders').
    // }
    static findById(userId){
        const db = getDB()
        return db.collection('users').findOne({_id:new mongodb.ObjectId(userId)})
    }
}

module.exports = User