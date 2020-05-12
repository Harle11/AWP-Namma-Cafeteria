const express = require('express')
const router = express.Router()
const User = require('../models/user')

//Login
router.get('/', (req, res) => {
  if(req.query.registration != null && req.query.registration=='success'){
    res.render('login', {
      pageType:'login',
      user: new User(),
      message: 'Successfully registered',
      messType: 'reg'
    })
  }
  res.render('login', {
    pageType:'login',
    user: new User()
  })
})

//Validate Login
router.post('/', async (req, res) =>{
  let user = new User({
    eid: req.body.name,
    pwd: req.body.pass
  })
  try {
    let loguser = await User.findOne({eid:user.eid})
    if (loguser == null) {
      res.render('login', {
        pageType:'login',
        user: new User(),
        message: 'No such user exists'
      })
    }
    else if (loguser.pwd == user.pwd){
      res.redirect('/home?user='+loguser._id)
    } else {
      res.render('login', {
        pageType:'login',
        user: new User(),
        message: 'Login Credentials do not match'
      })
    }
  } catch {
    res.redirect('/', {
      pageType:'login',
      user: new User(), 
      message: 'Error logging in'
    })
  }
})

//Registrations
router.get('/register', (req, res) => {
  res.render('register', {
    pageType:'login',
    user: new User()
  })
})

//Register the user
router.post('/register', async (req, res) => {
  let user = new User({
    name: req.body.name,
    eid: req.body.email,
    pwd: req.body.pass
  })
  if(req.body.pass != req.body.conpass){
    res.render('register', {
      pageType:'login',
      user: user, 
      message: 'Passwords do not match'
    })
  } else {
  try {
    const newUser = await user.save()
    res.redirect('/?registration=success')
  } catch {
    res.render('register', {
      pageType:'login',
      user: user, 
      errorMessage: 'Error creating User'
    })
  }}
})

//Home
router.get('/home', (req, res) => {
  res.render('home', {
    pageType:'home'
  })
})

//User Details
router.get('/userdetails', (req, res) => {
  res.render('userdetails', {
    pageType: 'userdetails'
  })
})

//Menu
router.get('/menu', (req, res) => {
  res.render('menu', {
    pageType: 'menu'
  })
})

//Quick Orders
router.get('/quickorders', (req, res) => {
  res.render('quickorders', {
    pageType: 'quickorders'
  })
})

//Search Results
router.get('/search', (req, res) => {
  res.render('search', {
    pageType: 'search'
  })
})

//Cart
router.get('/cart', (req, res) => {
  res.render('cart', {
    pageType: 'cart'
  })
})

//Order History
router.get('/orderhistory', (req, res) => {
  res.render('orderhistory', {
    pageType: 'orderhistory'
  })
})

//Live Orders
router.get('/liveorders', (req, res) => {
  res.render('liveorders', {
    pageType: 'liveorders'
  })
})

//Help
router.get('/help', (req, res) => {
  res.render('help', {
    pageType: 'help'
  })
})

//Contact Us
router.get('/contact', (req, res) => {
  res.render('contact', {
    pageType: 'contact'
  })
})

//Payments
router.get('/payments', (req, res) => {
  res.render('payments', {
    pageType: 'payments'
  })
})

//Submenu
router.get('/submenu', (req, res) => {
  res.render('submenu', {
    pageType: 'submenu'
  })
})

module.exports = router