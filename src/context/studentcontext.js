import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'

export const studentContextProvider = createContext()

export default function Studentcontext(props) {
	const accessToken = JSON.parse(localStorage.getItem('accessToken'))
	const user_id = localStorage.getItem('activeUserId')
	const user_name = JSON.parse(localStorage.getItem('activeUser'))

	const [student, setStudent] = useState([])
	const [groups, setGroups] = useState([])

	useEffect(() => {
		if (accessToken) {
			const getData = async () => {
				const response = await axios.get(
					'http://localhost:8080/v1/api/getstudents',
					{
						headers: {
							authorization: `Bearer ${accessToken}`,
						},
					}
				)
				const data = response.data
				setStudent(data.students)
			}
			getData()
		}
	}, [accessToken])

	useEffect(() => {
		if (accessToken) {
			const getGroups = async () => {
				const response = await axios.get(
					'http://localhost:8080/v1/api/getgroups',
					{
						headers: {
							authorization: `Bearer ${accessToken}`,
						},
					}
				)
				const data = response.data
				setGroups(data.groups)
			}
			getGroups()
		}
	}, [accessToken])

	const createGroup = async (groupName) => {
		const response = await axios.post(
			'http://localhost:8080/v1/api/addgroup',
			groupName,
			{
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			}
		)
		if (response.data.payload) {
			setGroups([...groups], response.data.payload.groupName)
		}
	}

	const deleteGroup = async (group_id, student_id) => {
		const response = await axios.delete(
			`http://localhost:8080/v1/api/deletegroup/${group_id}`,
			{
				student_id,
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			}
		)
		console.log(response)
	}

	const addStudents = async (studentName) => {
		const response = await axios.post(
			'http://localhost:8080/v1/api/addstudent',
			studentName,
			{
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			}
		)
		if (response.data.payload) {
			setStudent([...student], response.data.payload.name)
		}
	}

	const deleteStudents = async (id) => {
		const response = await axios.delete(
			`http://localhost:8080/v1/api/deletestudent/${id}`,
			{ headers: { authorization: `Bearer ${accessToken}` } }
		)
		console.log(response)
	}

	const addToGroup = async (id, student_id) => {
		const response = await axios.put(
			`http://localhost:8080/v1/api/addtogroup/${id}`,
			{ student_id },
			{
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			}
		)
		console.log(response)
	}
	const removeFromGroup = async (student_id) => {
		const response = await axios.put(
			`http://localhost:8080/v1/api/removefromgroup`,
			{ student_id },
			{
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			}
		)
		console.log(response)
	}

	const newChat = async (id, message) => {
		const response = await axios.post(
			`http://localhost:8080/v1/api/newmessage/${id}`,
			{ user_name: user_name, user_id: user_id, message },
			{
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			}
		)
		console.log(response)
	}

	return (
		<studentContextProvider.Provider
			value={{
				student,
				groups,
				createGroup,
				deleteGroup,
				addStudents,
				deleteStudents,
				addToGroup,
				removeFromGroup,
				newChat,
				accessToken,
				user_id,
			}}
		>
			{props.children}
		</studentContextProvider.Provider>
	)
}
