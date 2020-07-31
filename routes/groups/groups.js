const router = require('express').Router()
const mysqlConnection = require('../../dbconnect')
const verify = require('../auth/tokenvalidation')

router.post('/addgroup', verify, async (req, res) => {
	const data = { groupname: req.body.groupName }
	const query = await 'INSERT INTO groupsTable SET ?'
	mysqlConnection.query(query, data, (err, result) => {
		if (err) {
			return res.send({ message: err })
		}
		res.send({ payload: data })
	})
})

router.get('/getgroups', async (req, res) => {
	const query = 'SELECT * FROM  groupsTable'
	mysqlConnection.query(query, (err, result) => {
		if (err) {
			return res.send({ message: err })
		}
		res.send({ groups: result })
	})
})

router.get('/getgroups/:id', async (req, res) => {
	const query = `SELECT * FROM groupsTable WHERE group_id = ${req.params.id}`
	mysqlConnection.query(query, (err, result) => {
		if (err) {
			return res.send({ message: err })
		}
		res.send({ groups: result })
	})
})

router.delete('/deletegroup/:id', verify, async (req, res) => {
	const query = `DELETE FROM groupsTable WHERE group_id = ${req.params.id}`
	mysqlConnection.query(query, (err) => {
		if (err) {
			return res.send({ message: err })
		}
		res.send({ message: `Group with id ${req.params.id} deleted` })
	})
})
module.exports = router
