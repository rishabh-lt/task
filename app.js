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
        task : req.body.task,
        status: 'active'
    })
    .then((resp)=>{
            return res.send(200,{message:'inserted'})
    })
    .catch(err=>{
            return res.send(400,{message:'error: '+err})
    })
})

// read
app.get('/read',(req,res)=>{
    User.findAll(
        {
            attributes : ['task'],
             where: { status: 'active' },
        })
    .then((tasks)=>{
         return res.send(200,{data:tasks})
    })
    .catch((err)=>
         return res.send(400,{message:'error: '+err})
    )
})

//update
app.put('/update',(req,res)=>{
    User.update(
        {task:req.query.task},
        {where:{sno:req.query.sno}})
   .then((users)=>{
        return res.send(200,{message:'updated'})
    })
   .catch((err)=>
         return res.send(400,{message:'error: '+err})
    )
})

app.put('/completed',(req,res)=>{
    User.update(
        {status:'completed'},
        {where:{sno:req.query.sno}})
   .then((users)=>{
        return res.send(200,{message:'completed'})
    })
   .catch((err)=>
         return res.send(400,{message:'error: '+err})
    )
})

//delete
app.delete('/delete',(req,res)=>{
     User.update(
        {status:'deleted'},
        {where:{sno:req.query.sno}})
   .then((users)=>{
        return res.send(200,{message:'deleted'})
    })
   .catch((err)=>
         return res.send(400,{message:'error: '+err})
    )
})


db.sequelize.sync().then((req)=>{
    http.listen(3001,()=>{
        console.log('Running server on 3001')
    })
})
