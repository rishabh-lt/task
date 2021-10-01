const express = require('express')
const app = express()
const db = require('./models')
const path = require('path')
const httpServer = require('http')
const http = httpServer.createServer(app)
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
const { User } = require('./models')

// 
app.get('/',(req,res)=>{
    htmlpath = path.join(__dirname,"index.html")
    res.sendFile(htmlpath)
})

// create
app.post('/insert',(req,res)=>{
    User.create({
        firstname : req.body.username,
        sno: req.body.sno
    }).catch(err=>{
        console.log(err)
    })

    res.send('inserted')
})

// read
app.get('/read',(req,res)=>{
    User.findAll().then((users)=>{
        res.send(users)
    }).catch((err)=>console.log(err))
})

//update
app.get('/update',(req,res)=>{
    User.update({firstname:req.query.names},{where:{sno:req.query.sno}}).then((users)=>{
        console.log(users)
        res.send(users)
    })
    res.send('updated')
})

//delete
app.get('/delete/:sno',(req,res)=>{
    User.destroy({where:{sno:req.params.sno}})
    res.send('deleted')
})


db.sequelize.sync().then((req)=>{
    http.listen(3001,()=>{
        console.log('Running server on 3001')
    })
})