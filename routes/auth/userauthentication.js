const router = require('express').Router()
const mysqlConnection = require('../../dbconnect')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../../validation')

router.post('/register', async (req, res) => {
	//validation
	const { error } = registerValidation(req.body)
	if (error) {
		return res.send({ error: error.details[0].message })
	}
	//hashing password
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(req.body.password, salt)

	const data = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: hashedPassword,
	}
	const query = 'INSERT INTO registration SET ?'
	mysqlConnection.query(query, data, (err, payload) => {
		if (err) {
			return { message: err }
		}
		res.send({
			success: true,
			message: 'Registered successfully',
			data: payload,
		})
	})
})

router.get('/userinfo', async (req, res) => {
	const query = 'SELECT * FROM registration'
	mysqlConnection.query(query, (err, result) => {
		if (err) {
			return res.send({ message: err })
		}
		res.send({ payload: result[0] })
	})
})

router.post('/login', async (req, res) => {
	//validation
	const { error } = loginValidation(req.body)
	if (error) {
		return res.send({ error: error.details[0].message })
	}

	//if email exist
	const data = req.body
	const query = `SELECT * FROM registration WHERE email = '${data.email}'`
	mysqlConnection.query(query, async (err, payload) => {
		if (err) {
			return res.send({ message: err })
		}
		if (payload == '') {
			return res.send({ error: 'Invalid email or password' })
		}
		const validPassword = await bcrypt.compare(
			data.password,
			payload[0].password
		)
		if (!validPassword) {
			return res.send({ error: 'Invalid email or password' })
		}
		const token = jwt.sign(
			{ payload: payload[0].user_id },
			process.env.SECRET_TOKEN
		)
		return res.send({
			success: true,
			message: 'Logged in successfully',
			accessToken: token,
			payload: {
				user_id: payload[0].user_id,
				user_name: payload[0].first_name,
			},
		})
	})
})

module.exports = router
