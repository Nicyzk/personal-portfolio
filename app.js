const express = require('express')
const fs = require('fs')
const path = require('path')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const messageRoutes = require('./routes/message')

const app = express()

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'build', 'access.log'),
    { flags: 'a' }
)
app.use(helmet())
app.use(compression())
app.use(morgan('combined', { stream: accessLogStream }))

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'build')))

app.use('/message', messageRoutes)

app.use('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.use((err, req, res, next) => {
    return res.status(500).json({
        errorMessage: err.message
    })
})

app.listen(process.env.PORT || 3000)