const express = require('express')
const mrouter = express.Router()
const User = require('../models/user')
const Cafeteria = require('../models/bmscafeteria')
const Order = require('../models/orders')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

//Manager Home
mrouter.get('/managerhome', (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(), 
      npage: '/manager/managerhome',
      message: 'Please Log In to continue'
    })
  }
  if(!req.session.usermanager){
    return res.redirect('/')
  }
  return res.render('manager_home', {
    pageType: "managerhome"
  })
})

//Manage Menu
mrouter.get('/managemenu', async (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(), 
      npage: '/manager/managemenu',
      message: 'Please Log In to continue'
    })
  }
  if(!req.session.usermanager){
    return res.redirect('/')
  }
  dish_types = await Cafeteria.distinct('dish_type')
  durls = await Cafeteria.distinct('url')
  return res.render('manager_menu', {
    pageType:'managermenu',
    dish_types: dish_types,
    durls: durls
  })
})

//Manager Submenu
mrouter.get('/submenu', async (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(), 
      npage: '/manager/managemenu',
      message: 'Please Log In to continue'
    })
  }
  if(!req.session.usermanager){
    return res.redirect('/')
  }
  ditype = req.query.type
  let dishes = await Cafeteria.find({url: ditype})
  let onedish = await Cafeteria.findOne({url: ditype})
  dtype = ''
  durl = ''
  isempty = true
  if(onedish) {
    isempty=false
    dtype=onedish.dish_type
    durl=onedish.url
  }
  return res.render('manager_submenu', {
    pageType: 'managermenu',
    dishes: dishes,
    dtype: dtype,
    durl:durl,
    isempty: isempty
  })
})

//Manager DeleteDish
mrouter.get('/deletedish', async (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(), 
      npage: '/manager/managemenu',
      message: 'Please Log In to continue'
    })
  }
  if(!req.session.usermanager){
    return res.redirect('/')
  }
  dishid = req.query.dish_id
  durl = req.query.durl
  dish = await Cafeteria.findById(dishid)
  if(dish){
    await dish.remove()
    return res.redirect('/manager/submenu?type='+durl)
  } else {
    return res.redirect('/manager/menu?deletion=failed')
  }
})

//Manager AddDish
mrouter.post('/newdish', async (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(), 
      npage: '/manager/managemenu',
      message: 'Please Log In to continue'
    })
  }
  if(!req.session.usermanager){
    return res.redirect('/')
  }
  dish = new Cafeteria({
    dish_type: req.body.dishtype,
    dish_name: req.body.dishname,
    price: parseInt(req.body.price),
    url: req.body.durl
  })
  newdish = await dish.save()
  return res.redirect('/manager/submenu?type='+req.body.durl)
})

//Toggle Availability
mrouter.get('/available', async (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(), 
      npage: '/manager/managemenu',
      message: 'Please Log In to continue'
    })
  }
  if(!req.session.usermanager){
    return res.redirect('/')
  }
  avl = req.query.avl
  dish = await Cafeteria.findById(req.query.dishid)
  if (avl=='false'){
    dish.available = true
  } else {
    dish.available = false
  }
  await dish.save()
  return res.redirect('/manager/submenu?type='+dish.url)
})

//Manage Orders
mrouter.get('/manageliveorders', async (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(), 
      npage: '/manager/manageliveorders',
      message: 'Please Log In to continue'
    })
  }
  if(!req.session.usermanager){
    return res.redirect('/')
  }
  live_orders = await Order.find({active:true})
  isempty = true
  if(live_orders.length > 0) isempty = false
  return res.render('manager_liveorders', {
    pageType: 'managerliveorders',
    live_orders: live_orders,
    isempty: isempty
  })
})

//Order Completed
mrouter.get('/ordercomplete', (req, res) => {
  return res.redirect('/manager/manageliveorders')
})
mrouter.post('/ordercomplete', async (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(), 
      npage: '/manager/manageliveorders',
      message: 'Please Log In to continue'
    })
  }
  if(!req.session.usermanager){
    return res.redirect('/')
  }
  orderid = req.body.order_id
  completedorder = await Order.findById(orderid)
  if(completedorder){
    completedorder.active = false
    updateorder = await completedorder.save()
    return res.redirect('/manager/manageliveorders')
  }
  return res.redirect('/manager/manageliveorders?task=failed')
})

//View All Orders
mrouter.get('/viewallorders', async (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(), 
      npage: '/manager/viewallorders',
      message: 'Please Log In to continue'
    })
  }
  if(!req.session.usermanager){
    return res.redirect('/')
  }
  all_orders = await Order.find()
  isempty = true
  if(all_orders.length > 0){
    isempty = false
  }
  return res.render('manager_allorders', {
    pageType: 'managerorders',
    all_orders: all_orders,
    isempty: isempty
  })
})

module.exports = mrouter