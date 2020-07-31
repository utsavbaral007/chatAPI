import React from 'react'
import Mainscreen from './components/mainscreen'
import Chatscreen from './components/chatscreen'
import Login from './components/login/login'
import StudentContext from './context/studentcontext'
import Privateroute from './routes/privateroute'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
function App() {
	return (
		<StudentContext>
			<BrowserRouter>
				<div className="container">
					<Switch>
						<Route path="/" exact component={Login} />
						<Privateroute path="/chat" exact component={Mainscreen} />
						<Privateroute path="/chat/:id" exact component={Chatscreen} />
					</Switch>
				</div>
			</BrowserRouter>
		</StudentContext>
	)
}

export default App
