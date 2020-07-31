const express = require('express')
const app = express()
const mysqlConnecton = require('./dbconnect')
const cors = require('cors')
const http = require('http')
const server = http.createServer(app)
require('dotenv/config')

//middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

//import router
const studentsRoute = require('./routes/students/studentsCRUD')
const groupsRoute = require('./routes/groups/groups')
const messageRoute = require('./routes/messages/messages')
const authRoute = require('./routes/auth/userauthentication')

//add routes
app.use('/v1/api', studentsRoute)
app.use('/v1/api', groupsRoute)
app.use('/v1/api', messageRoute)
app.use('/v1/api', authRoute)

const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
	console.log(`Server up and running at port ${PORT}`)
})
