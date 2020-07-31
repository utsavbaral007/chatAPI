const router = require('express').Router()
const mysqlConnection = require('../../dbconnect')
const verify = require('../auth/tokenvalidation')

router.post('/newmessage/:id', verify, async (req, res) => {
	const data = {
		message: req.body.message,
		group_id: req.params.id,
		student_id: req.body.user_id,
		student_name: req.body.user_name,
	}
	const query = `INSERT INTO messages SET ?`
	mysqlConnection.query(query, data, (err, result) => {
		if (err) {
			return res.send({ message: err })
		}
		res.send({ message: result })
	})
})

router.get('/getmessage/:id', verify, async (req, res) => {
	const query = `SELECT * FROM messages WHERE group_id = ${req.params.id}`
	mysqlConnection.query(query, (err, result) => {
		if (err) {
			return res.send({ message: err })
		}
		res.send({ message: result })
	})
})

module.exports = router
