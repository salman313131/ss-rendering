const Product = require('../models/product');

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
  req.user.createProduct({ title:title,
    price:price,
    imageUrl:imageUrl,
    description:description}).then(r=>{
    console.log(r)
    res.redirect('/admin/products')
  }).catch(err=>console.log(err))
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/')
  }
  const prodId = req.params.productId
  user.req.getProducts({where:{id:prodId}}).then(products=>{
    const product = products[0]
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
  const updatedProduct = new Product(prodId,updatedTitle,updatedImg,updatedDesc,updatedPrice)
  updatedProduct.save()
  res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
  req.user.getProducts().then(products=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    })
  }).catch(err=>console.log(err))
};

exports.postDeleteProducts = (req,res,next) => {
  const prodId = req.body.productId
  Product.destroy({where:{id:prodId}}).then(r=>{
    res.redirect('/admin/products')
  }).catch(err=>console.log(err))
}
