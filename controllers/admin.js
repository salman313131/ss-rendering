const Product = require('../models/product');
const objId = require('mongodb').ObjectId

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing : false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title,price,imageUrl,description,null,req.user._id)
  product.save().then(r=>{
    console.log('product created')
    res.redirect('/admin/products')
  }).catch(err=>console.log(err))
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/')
  }
  const prodId = req.params.productId
  Product.fetchById(prodId).then(product=>{
    if(!product){
      res.redirect('/');
    }
    res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing: editMode,
    product:product
  })
}).catch(err=>console.log(err))
};

exports.postEditProduct = (req,res,next)=>{
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedPrice = req.body.price
  const updatedDesc = req.body.description
  const updatedImg = req.body.imageUrl
  const updatedProduct = new Product(updatedTitle,updatedPrice,updatedImg,updatedDesc,new objId(prodId))
  updatedProduct.save().then(result=>{
    console.log('product Updated')
    res.redirect('/admin/products')
  }).catch(err=>console.log(err))
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(products=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    })
  }).catch(err=>console.log(err))
};

exports.postDeleteProducts = (req,res,next) => {
  const prodId = req.body.productId
  Product.delete(prodId).then(r=>{

     res.redirect('/admin/products')
  }).catch(err=>console.log(err))
}
