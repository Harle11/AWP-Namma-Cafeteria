const express = require('express')
const mrouter = express.Router()
const Cafeteria = require('../models/bmscafeteria')
const Order = require('../models/orders')

//Manager Home
mrouter.get('/managerhome', (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(), 
      npage: '/managerhome',
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
      npage: '/managemenu',
      message: 'Please Log In to continue'
    })
  }
  if(!req.session.usermanager){
    return res.redirect('/')
  }
  return res.send("Manager Menu")
})

//Manage Orders
mrouter.get('/manageliveorders', (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(), 
      npage: '/manageliveorders',
      message: 'Please Log In to continue'
    })
  }
  if(!req.session.usermanager){
    return res.redirect('/')
  }
  return res.send("Manage Orders")
})

//View All Orders
mrouter.get('/viewallorders', (req, res) => {
  if(!req.session.userId){
    return res.render('login', {
      pageType:'login',
      user: new User(), 
      npage: '/viewallorders',
      message: 'Please Log In to continue'
    })
  }
  if(!req.session.usermanager){
    return res.redirect('/')
  }
  return res.send("View All Orders")
})

module.exports = mrouter