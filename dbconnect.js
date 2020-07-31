const mysql = require('mysql')
const mysqlConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '2828',
	database: 'students',
})

mysqlConnection.connect((err) => {
	if (err) {
		throw err
	}
	console.log('Connected to database successfully')
})

module.exports = mysqlConnection
