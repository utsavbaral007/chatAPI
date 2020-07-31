const jwt = require('jsonwebtoken')

const verify = (req, res, next) => {
	const token = req.get('authorization')
	if (token) {
		var newToken = token.slice(7)
		jwt.verify(newToken, process.env.SECRET_TOKEN, (err) => {
			if (err) {
				return res.send({ error: 'Invalid Token' })
			}
			next()
		})
	} else {
		return res.send({ error: 'Access denied, unauthorized user' })
	}
}

module.exports = verify
