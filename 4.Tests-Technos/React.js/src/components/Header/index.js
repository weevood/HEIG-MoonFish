import React from 'react';
import {withRouter} from "react-router-dom";

function Header(props) {

		const capitalize = (s) => {
				if(typeof s !== 'string') {
						return ''
				}
				return s.charAt(0).toUpperCase() + s.slice(1)
		}

		let title = capitalize(props.location.pathname.substring(1, props.location.pathname.length))

		if(props.location.pathname === '/') {
				title = 'Welcome'
		}

		function renderLogout() {
				if(props.location.pathname === '/') {
						return (
								<div className="ml-auto">
										<button className="btn btn-danger" onClick={() => handleLogout()}>Logout</button>
								</div>
						)
				}
		}

		function handleLogout() {
				localStorage.removeItem('ACCESS_TOKEN')
				props.history.push('/')
		}

		return (
				<header className="max-w-lg mx-auto mt-8 md:mt-16">
						<h1 className="text-4xl font-bold text-white text-center">{props.title || title}</h1>
						{renderLogout()}
				</header>
		)
}

export default withRouter(Header);
