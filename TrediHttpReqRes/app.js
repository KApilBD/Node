const express = require('express');

const app = express();

app.use('/add-product',(req,res,next)=>{
    console.log("Inside route add product Middleware");
    res.send('<h1>Add Product!!!!!</h1>')
});
app.use('/',(req,res,next)=>{
    console.log("Inside Middleware");
    res.send('<h1>Hello from Express!!!!!</h1>')
});

app.listen(3000, () => { console.log("Server is running, press ctrl+c to stop...") })