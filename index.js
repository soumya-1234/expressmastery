const express = require('express');

const app =express();

const path= require('path');

const phone= require('./data');
const { request } = require('http');

const logger = (req,res,next)=>{
    console.log(`${new Date()}, Request[${req.method}], [${req.url}]`);
    next();
}

app.use('/sample',logger);
app.get('/',(req,res)=>{
    res.send('<h1>Hello world ! </h1>');
})

app.get('/r1',(req,res)=>{
    res.status(404).send("<h1>Something went wrong");
})

app.get('/sendfiles',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.get('/jsonres',(req,res)=>{
    res.json([{
        firstname: "soumya",
        lastname: "Acharya"
    },{
        firstname: "Bishnu",
        lasname: "Rout"
    }])
})

app.get('/jsonexample',(req,res)=>{
    res.send('<h1>Home</h1> <a href="/api/phone">Phone</a>')
})

app.get('/api/phone',(req,res)=>{
    res.json(phone);
})

app.get('/phone/:phoneID',(req,res)=>{
    console.log(req.params);
    const singleProduct = phone.find((product)=>product.id == req.params.phoneID)
    const individual = singleProduct.name;
    res.send(individual);
})

app.get('/sample',(req,res)=>{
    res.send('Hiiiiiiiiiiiii')
})


app.all('*',(req,res)=>{
    res.send("Page is not found")
})

app.listen(3000,()=>{
    console.log("Server is running ")
})
