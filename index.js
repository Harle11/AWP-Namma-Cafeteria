const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const session = require('express-session')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
  
}))

const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://user:LhSxNtK9Tx9NWGxf@cluster0-exted.gcp.mongodb.net/nammaDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.error('Connected to MongoDB Atlas'))


app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)