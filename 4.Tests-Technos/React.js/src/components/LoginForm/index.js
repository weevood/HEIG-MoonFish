import React, {useState} from 'react';
import axios from 'axios';
import './index.css';
import {withRouter} from "react-router-dom";
import AlertComponent from "../AlertComponent";

function Index(props) {
		const API_BASE_URL = 'http://localhost:3001'

		const [state, setState] = useState({
				email: "",
				password: "",
				successMessage: null
		})

		const handleChange = (e) => {
				const {id, value} = e.target
				setState(prevState => ({
						...prevState,
						[id]: value
				}))
		}

		const handleSubmitClick = (e) => {
				e.preventDefault();
				if(state.email.length && state.password.length)
				{
						const payload = {
								"email": state.email,
								"password": state.password,
						}
						axios.post(API_BASE_URL + '/auth', payload)
						     .then(function(response) {
								     if(response.status === 200) {
										     setState(prevState => ({
												     ...prevState,
												     'successMessage': 'Login successful. Redirecting to home page...'
										     }))
										     localStorage.setItem('ACCESS_TOKEN', response.data);
										     redirectToHome();
										     props.showError(null)
								     }
								     else if(response.code === 204) {
										     props.showError("Username and password do not match");
								     }
								     else {
										     props.showError("Username does not exists");
								     }
						     })
						     .catch(function(error) {
								     props.showError(error.message);
						     });
				}
				else {
						props.showError('Please enter an username and a password')
				}
		}

		const redirectToHome = () => {
				props.updateTitle('Home')
				props.history.push('/');
		}

		const redirectToRegister = () => {
				props.history.push('/register');
				props.updateTitle('Register');
		}

		return (
				<main className="max-w-lg mx-auto flex-grow w-9/12">
						<div className="bg-gray-100 p-8 md:p-12 mt-10 mb-5 rounded-lg shadow-2xl flex-grow">
								<section>
										<h3 className="text-blue-900 text-3xl font-medium">Sign in to your account</h3>
								</section>
								<hr className="border-blue-900 border-t-2 w-1/4 mt-3"/>
								<AlertComponent errorMessage={props.errorMessage} hideError={props.updateErrorMessage}/>
								<div className="alert alert-success my-2" style={{display: state.successMessage ? 'block' : 'none'}}
								     role="alert">
										{state.successMessage}
								</div>
								<section className="mt-10">
										<form className="flex flex-col" method="POST" action="#">
												<div className="mb-6 pt-3 rounded bg-gray-200">
														<label className="block text-gray-700 text-sm font-bold md:mb-2 ml-3"
														       htmlFor="email">Email</label>
														<input type="email" id="email"
														       className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"
														       placeholder="Enter email"
														       value={state.email}
														       onChange={handleChange}/>
												</div>
												<div className="mb-6 pt-3 rounded bg-gray-200">
														<label className="block text-gray-700 text-sm font-bold md:mb-2 ml-3"
														       htmlFor="password">Password</label>
														<input type="password" id="password"
														       className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"
														       type="password"
														       placeholder="Password"
														       value={state.password}
														       onChange={handleChange}/>
												</div>
												<button
														className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 focus:outline-none focus:ring"
														type="submit"
														onClick={handleSubmitClick}>Sign In
												</button>
										</form>
								</section>
								<div className="md:grid grid-cols-3 divide-x my-3 hidden">
										<hr className="border-gray-500 border-t-1 w-full my-6"/>
										<span className="text-sm text-gray-600 text-center my-3">Or continue with</span>
										<hr className="border-gray-500 border-t-1 w-full my-6"/>
								</div>
								<section className="grid grid-cols-3 divide-x mt-8 md:mt-0">
										<a className="h-16 bg-gray-200 rounded mr-4 p-3 text-center hover:bg-gray-300 transition duration-200">
												<img className="w-auto h-full mx-auto cursor-pointer" src="/images/google_logo.svg"
												     alt="Sign-in with Google"/>
										</a>
										<a className="h-16 bg-gray-200 rounded mx-2 p-3 text-center hover:bg-gray-300 transition duration-200">
												<img className="w-auto h-full mx-auto cursor-pointer" src="/images/github_logo.svg"
												     alt="Sign-in with GitHub"/>
										</a>
										<a className="h-16 bg-gray-200 rounded ml-4 p-3 text-center hover:bg-gray-300 transition duration-200">
												<img className="w-auto h-full mx-auto cursor-pointer" src="/images/apple_logo.svg"
												     alt="Sign-in with Apple"/>
										</a>
								</section>
						</div>
						<div className="max-w-lg mx-auto text-center mt-5 mb-6">
								<p className="text-white">
										<a href="#" className="font-bold hover:underline">Forgot your password?</a> or
										<span className="font-bold hover:underline" onClick={() => redirectToRegister()}>&nbsp;Dont have an account?</span>
								</p>
						</div>
				</main>
		)
}

export default withRouter(Index);
