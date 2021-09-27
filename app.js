const express = require('express')
const expressLayouts = require('express-ejs-layouts')

//mongoose

const mongoose = require('mongoose')
const passport = require('passport')
const app=express()
//DBconfig
const db= require('./config/keys').MomgoURI

//passport
require('./config/passport')(passport)
//flash
const flash = require('connect-flash')

//session
const session = require('express-session')

//connect to mongoose
mongoose.connect(db, {useNewUrlParser: true})
.then(()=>console.log('MOngoDB connected'))
.catch(err => console.log(err))
//EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

//bodyparser
app.use(express.urlencoded({extended: false}))

//express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
//paspport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flass
app.use(flash())

//global vars
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

//routes 
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server started om port ${PORT}`))