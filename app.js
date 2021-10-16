const express = require('express')
const {port} = require('./config')
const user = require('./models/User')
const app = express()

//middleware
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.json())

app.use(require('./routes/forgot-password'))

app.listen(port, () => {
    console.log('🚀 Backend is running:' + port);
})