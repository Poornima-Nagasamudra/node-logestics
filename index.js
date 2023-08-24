const express = require('express')
const app = express()
const port = 4011

const nodeDB = require('./config/database')
const routes = require('./config/routes')

app.use(express.json())
nodeDB()
app.use('/', routes)

app.listen(port, function(){
    console.log('server runs on port', port)
})