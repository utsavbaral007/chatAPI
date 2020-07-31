import React, { useContext, useState } from 'react'
import { GrAddCircle } from 'react-icons/gr'
import { AiOutlineStop } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Modal, Button, Form, Table } from 'react-bootstrap'

import { studentContextProvider } from '../context/studentcontext'

export default function Mainscreen() {
	const [show, setShow] = useState(false)
	const [showDelete, setShowDelete] = useState(false)
	const [showAdd, setShowAdd] = useState(false)
	const [showDeleteStudent, setShowDeleteStudent] = useState(false)

	const handleDelStudentShow = () => setShowDeleteStudent(true)
	const handleDelStudentHide = () => setShowDeleteStudent(false)

	const handleShowAdd = () => setShowAdd(true)
	const handleHideAdd = () => setShowAdd(false)

	const [groupName, setGroupName] = useState('')
	const [studentName, setStudentName] = useState('')

	const [deleteItem, setDeleteItem] = useState('')
	const [deleteStudent, setDeleteStudent] = useState('')

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const {
		student,
		groups,
		createGroup,
		deleteGroup,
		addStudents,
		deleteStudents,
	} = useContext(studentContextProvider)

	const handleAddStudents = (e) => {
		e.preventDefault()
		addStudents({ studentName })
		handleHideAdd()
		setTimeout(() => window.location.reload(), 100)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		createGroup({ groupName })
		handleClose()
		setTimeout(() => window.location.reload(), 100)
	}

	const showStudentDeleteModal = (id) => {
		handleDelStudentShow()
		setDeleteStudent(id)
	}

	const showDeleteModal = (id) => {
		setShowDelete(!showDelete)
		setDeleteItem(id)
	}
	const handleDelete = () => {
		deleteGroup(deleteItem)
		setShowDelete(!showDelete)
		setTimeout(() => window.location.reload(), 100)
	}

	const handleStudentDelete = () => {
		deleteStudents(deleteStudent)
		handleDelStudentHide()
		setTimeout(() => window.location.reload(), 100)
	}

	return (
		<div className="main-container">
			<div className="chatBox">
				<h2>Admin Panel</h2>
				<div className="user-and-group">
					<div className="students">
						<h3>Students list</h3>
						<Table borderless>
							<tbody>
								{student.map((students) => (
									<tr key={students.student_id}>
										<td className="studentName">{students.student_name}</td>
										<td
											onClick={() =>
												showStudentDeleteModal(students.student_id)
											}
										>
											<AiOutlineStop className="deleteStudent" />
										</td>
									</tr>
								))}
							</tbody>
						</Table>
						<span className="addlogo">
							<GrAddCircle size="2rem" onClick={handleShowAdd} />
						</span>
					</div>
					<div className="groups">
						<h3>Groups</h3>
						<Table striped hover>
							<thead>
								<tr>
									<th>Group name</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{groups &&
									groups.map((group) => (
										<tr key={group.group_id}>
											<td className="groupname">
												<Link
													to={`/chat/${group.group_id}`}
													style={{ color: 'black' }}
												>
													{group.groupname}
												</Link>
											</td>
											<td className="deletelogo">
												<AiOutlineStop
													onClick={() => showDeleteModal(group.group_id)}
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
				</div>
			</div>

			{/* add group Modal */}
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>
					<Form.Group>
						<Form.Label>Create new group</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter group name..."
							onChange={(e) => setGroupName(e.target.value)}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" type="submit" onClick={handleSubmit}>
						Create
					</Button>
				</Modal.Footer>
			</Modal>

			{/* delete group Modal */}
			<Modal show={showDelete} onHide={() => setShowDelete(showDelete)}>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>Are you sure you want to delete this group?</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={() => setShowDelete(!showDelete)}>
						No
					</Button>
					<Button variant="primary" onClick={handleDelete}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Add student Modal */}
			<Modal show={showAdd} onHide={handleHideAdd}>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>
					<Form.Group>
						<Form.Label>Add new student</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter student name..."
							onChange={(e) => setStudentName(e.target.value)}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleHideAdd}>
						Cancel
					</Button>
					<Button variant="primary" type="submit" onClick={handleAddStudents}>
						Add
					</Button>
				</Modal.Footer>
			</Modal>

			{/* delete Student Modal */}
			<Modal show={showDeleteStudent} onHide={() => setShowDelete(showDelete)}>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>Are you sure you want to remove this student?</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleDelStudentHide}>
						No
					</Button>
					<Button variant="primary" onClick={handleStudentDelete}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}
