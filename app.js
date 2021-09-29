const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')

task = []

function middleware(req,res,next){
    
    taskhtml = "<table><tr><th>S.no</th><th>task</th></tr>"
    
    for (let i = 0; i < task.length; i++) {
        const element = task[i];
        taskhtml += (`<tr><td>${i}</td><td>${element}</td></tr>`)
    }
    
    taskhtml += "</table>"

    req.tasklist = taskhtml
    return
    // next()
}

//CRUD

app.get('/add',(req,res,next)=>{
    console.log('ADD')
    console.log(req.query.task)
    task.push(req.query.task)
    next()
    return res.send(req.tasklist)
})

//READ
app.get('/',(req,res,next)=>{
    console.log('HOME')
    next()
    return res.send(req.tasklist)
})

//UPDATE
app.get('/update',(req,res,next)=>{
    console.log('UPDATE')
    console.log(req.query.updated)
    console.log(req.query.id)
    task[req.query.id] = req.query.updated
    next()
    return res.send(req.tasklist)
})

//DELETE
app.get('/delete',(req,res,next)=>{
    console.log('DELETE')
    console.log(req.query.id)
    task.splice(req.query.id,1)
    next()
    return res.send(req.tasklist)
})

app.use(middleware)

http.listen('4000',()=>{
    console.log('Running app on 4000')
})