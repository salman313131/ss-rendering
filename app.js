const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    User.findById('6505aaa0a7fde68fb6fdcaa9').then(user=>{
        req.user=user
        next()
    }).catch(err=>console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose.connect('mongodb+srv://jaan:jaankhan786@nodereact.mu2wjrq.mongodb.net/Products?retryWrites=true&w=majority')
.then(res=>{
    // const user = new User({name:'salman',email:'salman@gmail.com',cart:{item:[]}})
    // user.save();
    app.listen(8000)
}).catch(err=>console.log(err))