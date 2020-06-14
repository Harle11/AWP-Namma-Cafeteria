const express = require('express')
const mrouter = express.Router()
const User = require('../models/user')
const Cafeteria = require('../models/bmscafeteria')
const Order = require('../models/orders')

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
mrouter.get('/managemenu', (req, res) => {
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
  return res.send("Manager Menu")
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