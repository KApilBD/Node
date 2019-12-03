const express = require('express');

const app = express();

// app.use((req,res,next) =>{
//     console.log('first middleware');
//     next();
// })
// app.use((req,res,next)=>{
//     console.log('second middleware');
//     res.send("<p>Assignment</p>");
// })

app.use('/users',(req,res,next)=>{
    console.log('User middleware');
    res.send('<p>Middleware to handle /users</p>')
});
app.use('/', (req,res,next)=>{
    console.log('/ middleware');
    res.send('<p>middleware to handle /</p>')
})

app.listen(3000, () => { console.log("Server is running, press ctrl+c to stop...") })