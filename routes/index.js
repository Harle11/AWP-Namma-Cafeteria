const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Cafeteria = require('../models/bmscafeteria')
const Orders = require('../models/orders')
const bcrypt = require('bcryptjs')
const { regValidation, loginValidation } = require('../validations')

//Login
router.get('/', (req, res) => {
  if(req.session.userId){
    return res.redirect('/home')
  }
  if(req.query.registration != null && req.query.registration=='success'){
    return res.render('login', {
      pageType:'login',
      user: new User(),
      message: 'Successfully registered',
      messType: 'reg'
    })
  }
  return res.render('login', {
    pageType:'login',
    user: new User()
  })
})

//Validate Login
router.post('/', async (req, res) =>{
  let user = new User({
    eid: req.body.email,
    pwd: req.body.pass
  })
  const {error} = loginValidation(req.body)
  if(error){
    return res.render('login', {
      pageType:'login',
      user: user, 
      message: error.details[0].message
    })
  }
  try {
    let loguser = await User.findOne({eid:user.eid})
    if (loguser == null) {
      return res.render('login', {
        pageType:'login',
        user: new User(),
        message: 'No such user exists'
      })
    }
    else if (await bcrypt.compare(user.pwd, loguser.pwd)){
      req.session.userId = loguser._id
      nextUrl = (req.body.nurl).trim()
      return res.redirect(nextUrl)
    } else {
      return res.render('login', {
        pageType:'login',
        user: new User(),
        message: 'Login Credentials do not match'
      })
    }
  } catch {
    return res.render('login', {
      pageType:'login',
      user: new User(), 
      message: 'Error logging in'
    })
  }
})

//Registrations
router.get('/register', (req, res) => {
  if(req.session.userId){
    return res.redirect('/home')
  }
  return res.render('register', {
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

  const {error} = regValidation(req.body)
  if(error){
    return res.render('register', {
      pageType:'login',
      user: user, 
      message: error.details[0].message
    })
  }
  if(req.body.pass != req.body.conpass){
    return res.render('register', {
      pageType:'login',
      user: user, 
      message: 'Passwords do not match'
    })
  } else {
  try {
    const emailexists = await User.findOne({eid: req.body.email})
    if(emailexists){
      return res.render('register', {
        pageType:'login',
        user: user, 
        message: 'Email ID already taken'
      })
    } else {
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(user.pwd, salt)
    user.pwd = hashedpassword
    const newUser = await user.save()
    if(newUser) return res.redirect('/?registration=success')
    }
  } catch {
    return res.render('register', {
      pageType:'login',
      user: user, 
      errorMessage: 'Error creating User'
    })
  }}
})

//Home
router.get('/home', (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(), 
      npage: '/home',
      message: 'Please Log In to continue'
    })
  }
  return res.render('home', {
    pageType:'home',
    userId: req.session.userId
  })
})

//User Details
router.get('/userdetails', async (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(),
      npage: '/userdetails', 
      message: 'Please Log In to continue'
    })
  }
  const currUser = await User.findOne({_id: req.session.userId})
  let qckOrders = currUser.quick_orders
  if(qckOrders.length == 0) qckOrders = null
  if (currUser){
    return res.render('userdetails', {
      pageType: 'userdetails',
      Uemail: currUser.eid,
      Uname: currUser.name,
      Ucredit: currUser.credit,
      Uqck_orders: qckOrders
    })
  } else {
    return res.render('userdetails', {
      pageType: 'userdetails',
      LoadUserFailed: true
    })
  }
})

//Menu
router.get('/menu', async (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(),
      npage: '/menu', 
      message: 'Please Log In to continue'
    })
  }
  let dtypes = await Cafeteria.distinct('dish_type', function(err, ditypes) {
    return ditypes
  })
  let durls = await Cafeteria.distinct('url', function(err, diurls) {
    return diurls
  })
  return res.render('menu', {
    pageType: 'menu',
    dishTypes: dtypes,
    durls: durls
  })
})

//Submenu
router.get('/submenu', async (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(),
      npage: '/menu', 
      message: 'Please Log In to continue'
    })
  }
  ditype = req.query.type
  let dishes = await Cafeteria.find({url: ditype})
  let onedish = await Cafeteria.findOne({url: ditype})
  return res.render('submenu', {
    pageType: 'submenu',
    dishes: dishes,
    dtype: onedish.dish_type
  })
})

//Quick Orders
router.get('/quickorders', async (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(),
      npage: '/quickorders', 
      message: 'Please Log In to continue'
    })
  }
  const currUser = await User.findOne({_id: req.session.userId})
  let qckOrders = currUser.quick_orders
  let orderprice = []
  if(qckOrders.length == 0){
    qckOrders = null
  } else { 
    for (let i = 0; i < qckOrders.length; i++) {
      const ele = qckOrders[i];
      dish = await Cafeteria.findOne({dish_name: ele})
      orderprice.push(dish.price)
    }
  }
  if (currUser){
    return res.render('quickorders', {
      pageType: 'quickorders',
      Uqck_orders: qckOrders,
      orderprice: orderprice
    })
  } else {
    return res.render('quickorders', {
      pageType: 'quickorders',
      LoadUserFailed: true
    })
  }
})

//Search Results
router.get('/search', async (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(),
      npage: '/search?dishname='+req.query.dishname, 
      message: 'Please Log In to continue'
    })
  }
  searchdish = req.query.dishname
  matchingdishes = await Cafeteria.find({dish_name: new RegExp(searchdish,"i")})
  return res.render('search', {
    pageType: 'search',
    dishes: matchingdishes
  })
})

//Cart
router.get('/cart', (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(),
      npage: '/cart', 
      message: 'Please Log In to continue'
    })
  }
  return res.render('cart', {
    pageType: 'cart'
  })
})

//Order History
router.get('/orderhistory', (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(),
      npage: '/orderhistory', 
      message: 'Please Log In to continue'
    })
  }
  return res.render('orderhistory', {
    pageType: 'orderhistory'
  })
})

//Live Orders
router.get('/liveorders', (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(),
      npage: '/liveorders', 
      message: 'Please Log In to continue'
    })
  }
  return res.render('liveorders', {
    pageType: 'liveorders'
  })
})

//Help
router.get('/help', (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(),
      npage: '/help', 
      message: 'Please Log In to continue'
    })
  }
  return res.render('help', {
    pageType: 'help'
  })
})

//Contact Us
router.get('/contact', (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(),
      npage: '/contact', 
      message: 'Please Log In to continue'
    })
  }
  return res.render('contact', {
    pageType: 'contact'
  })
})

//Payments
router.get('/payments', (req, res) => {
  if(!req.session.userId){
    return res.redirect('/')
  }
  return res.render('payments', {
    pageType: 'payments'
  })
})

//Submenu
router.get('/submenu', (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(),
      npage: '/submenu', 
      message: 'Please Log In to continue'
    })
  }
  return res.render('submenu', {
    pageType: 'submenu'
  })
})

//Logout
router.get('/logout', (req, res) =>{
  req.session.destroy(err => {
    if(err) return res.redirect('/home')
  })
  return res.redirect('/')
})

module.exports = router