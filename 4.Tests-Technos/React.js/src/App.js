import React, {useState} from 'react';
import './App.css';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Home from './components/Home';
import PrivateRoute from './utils/PrivateRoute';
import {
		BrowserRouter as Router,
		Switch,
		Route
} from "react-router-dom";

function App() {
		const [title, updateTitle] = useState(null);
		const [errorMessage, updateErrorMessage] = useState(null);
		return (
				<Router>
						<div className="App">
								<Header title={title}/>
								<Switch>
										<PrivateRoute path="/" exact={true}>
												<Home/>
										</PrivateRoute>
										<Route path="/login">
												<LoginForm showError={updateErrorMessage} updateTitle={updateTitle}
												           errorMessage={errorMessage} updateErrorMessage={updateErrorMessage}/>
										</Route>
										<Route path="/register">
												<RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
										</Route>
								</Switch>
						</div>
				</Router>
		);
}

export default App;
