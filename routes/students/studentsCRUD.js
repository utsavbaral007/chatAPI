const router = require('express').Router()
const mysqlConnection = require('../../dbconnect')
const verify = require('../auth/tokenvalidation')

router.post('/addstudent', verify, async (req, res) => {
	const data = { student_name: req.body.studentName }
	const query = await 'INSERT INTO students SET ?'
	mysqlConnection.query(query, data, (err) => {
		if (err) {
			return res.send({ message: err })
		}
		res.send({ payload: data })
	})
})

router.get('/getstudents', verify, async (req, res) => {
	const query = await 'SELECT * FROM students'
	mysqlConnection.query(query, (err, result) => {
		if (err) {
			return res.send({ message: err })
		}
		res.send({ students: result })
	})
})

router.get('/getspecific/:id', verify, async (req, res) => {
	const query = await `SELECT * FROM students WHERE group_id = ${req.params.id}`
	mysqlConnection.query(query, (err, result) => {
		if (err) {
			return res.send({ message: err })
		}
		res.send({ students: result })
	})
})

router.delete('/deletestudent/:id', verify, async (req, res) => {
	const query = `DELETE FROM students WHERE student_id = ${req.params.id}`
	mysqlConnection.query(query, (err) => {
		if (err) {
			return res.send({ message: err })
		}
		res.send({ message: `student with id ${req.params.id} deleted` })
	})
})

router.put('/addtogroup/:id', verify, async (req, res) => {
	const data = req.body.student_id
	const query = `UPDATE students SET group_id = ${req.params.id} WHERE student_id = ${data}`
	mysqlConnection.query(query, (err) => {
		if (err) {
			return res.send({ message: err })
		}
		res.send({ message: 'Added to group successfully' })
	})
})

router.put('/removefromgroup', verify, async (req, res) => {
	const data = req.body.student_id
	const query = `UPDATE students SET group_id = NULL WHERE student_id = ${data}`
	mysqlConnection.query(query, (err) => {
		if (err) {
			return res.send({ message: err })
		}
		res.send({ message: 'Removed from group' })
	})
})

module.exports = router
