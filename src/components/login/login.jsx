import React, { useState, useContext, useEffect } from 'react'
import './login.css'
import axios from 'axios'
import { studentContextProvider } from '../../context/studentcontext'

export default function Login(props) {
	const { accessToken } = useContext(studentContextProvider)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [successMessage, setSuccessMessage] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()

		const response = await axios.post('http://localhost:8080/v1/api/login', {
			email: email,
			password: password,
		})
		console.log(response)
		const data = response.data
		if (data.error) {
			return setError(data.error)
		}
		setSuccessMessage(data.message)
		localStorage.setItem('activeUserId', JSON.stringify(data.payload.user_id))
		localStorage.setItem('activeUser', JSON.stringify(data.payload.user_name))
		localStorage.setItem('accessToken', JSON.stringify(data.accessToken))
		if (accessToken) {
			localStorage.setItem('success', 'true')
			setTimeout(() => props.history.push('/chat'), 1000)
		}
	}

	useEffect(() => {
		if (accessToken) {
			props.history.push('/chat')
			localStorage.setItem('success', 'true')
		}
	}, [accessToken, props.history])

	return (
		<div className="login-container">
			<div className="login-card">
				<div className="login-heading">
					<h3>Login</h3>
				</div>
				<div className="login-form">
					<form onSubmit={handleSubmit} action="">
						<input
							type="email"
							id="email"
							placeholder="Enter your email..."
							autoComplete="off"
							onChange={(e) => {
								setEmail(e.target.value)
								setError('')
							}}
						/>
						<input
							type="password"
							id="password"
							placeholder="Enter your password..."
							onChange={(e) => {
								setPassword(e.target.value)
								setError('')
							}}
						/>
						{error && (
							<p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
						)}
						{successMessage && (
							<p style={{ color: 'green', textAlign: 'center' }}>
								{successMessage}
							</p>
						)}
						<button type="submit" id="login-button" onSubmit={handleSubmit}>
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}
