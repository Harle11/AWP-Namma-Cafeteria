const express=require('express');
var router=express.Router();

router.use(express.static('public'));

router.get('/index',(req, res) => {
   res.render('index.ejs');
})

router.get('/Registration',(req, res) => {
   res.render('Registration.ejs');
})

router.get('/',(req, res) => {
    res.render('home.ejs');
})

router.get('/userdetails',(req, res) => {
    res.render('userdetails.ejs');
})

router.get('/quickorders',(req, res) => {
    res.render('quickorders.ejs');
})

router.get('/cart',(req, res) => {
    res.render('cart.ejs');
})

router.get('/contact',(req, res) => {
    res.render('contact.ejs');
})

router.get('/help',(req, res) => {
    res.render('help.ejs');
})

router.get('/liveorders',(req, res) => {
    res.render('liveorders.ejs');
})

router.get('/menu',(req, res) => {
    res.render('menu.ejs');
})

router.get('/orderhistory',(req, res) => {
    res.render('orderhistory.ejs');
})

router.get('/payments',(req, res) => {
    res.render('payments.ejs');
})

router.get('/searchresult',(req, res) => {
    res.render('searchresult.ejs');
})

router.get('/submenu',(req, res) => {
    res.render('submenu.ejs');
})

module.exports= router;