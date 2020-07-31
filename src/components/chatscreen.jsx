import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Table, Modal, Button } from 'react-bootstrap'
import { IoIosSend, IoMdAttach } from 'react-icons/io'
import { AiOutlineStop } from 'react-icons/ai'
import { GrAddCircle } from 'react-icons/gr'
import { studentContextProvider } from '../context/studentcontext'

export default function Chatscreen({ match }) {
	const [groups, setGroups] = useState([])
	const [students, setStudents] = useState([])
	const [getOutgoing, setGetOutgoing] = useState([])

	const [message, setMessage] = useState('')

	const {
		student,
		addToGroup,
		removeFromGroup,
		newChat,
		accessToken,
		user_id,
	} = useContext(studentContextProvider)

	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const closeModal = () => {
		handleClose()
		setTimeout(() => window.location.reload(), 100)
	}

	const handleAddToGroup = (stu_id) => {
		addToGroup(match.params.id, stu_id)
	}

	const handleRemoveFromGroup = (std_id) => {
		removeFromGroup(std_id)
		setTimeout(() => window.location.reload(), 100)
	}

	const handleNewChat = (e) => {
		newChat(match.params.id, message)
		document.getElementsByTagName('input')[0].value = ''
	}

	useEffect(() => {
		const getGroups = async () => {
			const response = await axios.get(
				`http://localhost:8080/v1/api/getgroups/${match.params.id}`,
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
	}, [match.params.id, accessToken])

	useEffect(() => {
		const getStudents = async () => {
			const response = await axios.get(
				`http://localhost:8080/v1/api/getspecific/${match.params.id}`,
				{
					headers: {
						authorization: `Bearer ${accessToken}`,
					},
				}
			)
			const data = response.data
			setStudents(data.students)
		}
		getStudents()
	}, [match.params.id, accessToken])

	useEffect(() => {
		const outGoing = async () => {
			const response = await axios.get(
				`http://localhost:8080/v1/api/getmessage/${match.params.id}`,
				{
					headers: {
						authorization: `Bearer ${accessToken}`,
					},
				}
			)
			console.log(response)
			const data = response.data
			setGetOutgoing(data.message)
		}
		outGoing()
	}, [match.params.id, accessToken, user_id])

	return (
		<div className="Chat-container">
			<div className="chatBox-container">
				<div className="group-name">
					{groups.map((group) => (
						<h5 key={group.group_id}>{group.groupname}</h5>
					))}
				</div>
				<div className="chat-messages">
					{getOutgoing.map((message) => (
						<div key={message.message_id} className="outgoing-text">
							<h6>{message.student_name}</h6>
							<p>{message.message}</p>
						</div>
					))}
					<div className="incoming-text">
						<h6>other active students</h6>
						<p>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum,
							nobis. Nisi commodi cupiditate id. Enim, sed porro necessitatibus
							dolor minima odio tempore illo laudantium, inventore animi minus
							esse, totam adipisci?
						</p>
					</div>
				</div>
				<div className="message-bar">
					<div className="messagebox">
						<form onSubmit={handleNewChat} action="">
							<input
								type="text"
								placeholder="Write a message..."
								onChange={(e) => setMessage(e.target.value)}
							/>
						</form>
					</div>
					<div className="send">
						<IoIosSend
							size="2.5rem"
							className="sendButton"
							onClick={() => {
								handleNewChat()
								setTimeout(() => window.location.reload(), 100)
							}}
						/>
						<IoMdAttach size="2.5rem" className="attachButton" />
					</div>
				</div>
			</div>

			<div className="students-lists">
				<h5>Students List</h5>
				<Table hover borderless>
					<thead>
						<tr>
							<th>Student name</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{students.map((student) => (
							<tr key={student.student_id}>
								<td className="studentName">{student.student_name}</td>
								<td className="deleteStudents">
									<AiOutlineStop
										onClick={() => handleRemoveFromGroup(student.student_id)}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
				<span className="addlogo">
					<GrAddCircle size="2rem" onClick={handleShow} />
				</span>
			</div>

			{/* add to group modal */}
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>List of students</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ height: '40vh', overflowY: 'auto' }}>
					<Table borderless hover className="students-to-group">
						<tbody>
							{student.map((students) => (
								<tr key={students.student_id}>
									<td>{students.student_name}</td>
									<td>
										<GrAddCircle
											className="addtogroup"
											onClick={() => {
												handleAddToGroup(students.student_id)
											}}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="primary" onClick={closeModal}>
						Done
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}
