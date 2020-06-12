const express = require('express')
require('dotenv').config()
const massive = require('massive')
const {CONNECTION_STRING, SERVER_PORT} = process.env
const ctrl = require('./products_controller')

const app = express()

app.get('/api/products', ctrl.getAll)
app.get('/api/products/:id', ctrl.getOne)
app.put('/api/products/:id', ctrl.update)
app.post('/api/products', ctrl.create)
app.delete('/api/products/:id', ctrl.delete)

massive({
    connectionString: {CONNECTION_STRING}, 
    ssl: {rejectUnauthorized: false}
}).then(dbInstance => {
    app.set('db', dbInstance)
}).catch(err => console.log(err))

app.use(express.json())

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`)
})