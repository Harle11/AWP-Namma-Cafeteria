require('./models/db');

const express=require('express');
const app=express();

// this will call your routes file
app.use('/',require('./routes/index'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))
console.log("http://localhost:3000")