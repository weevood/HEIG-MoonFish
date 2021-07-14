import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios'

function Home(props) {
		const API_BASE_URL = 'http://localhost:3001'

		useEffect(() => {
				const token = localStorage.getItem('ACCESS_TOKEN')
				axios.post(API_BASE_URL + '/users/me', {'token': token})
				     .then(function(response) {
						     if(response.status !== 200) {
								     redirectToLogin()
						     }
				     })
				     .catch(function() {
						     redirectToLogin()
				     });
		})

		function redirectToLogin() {
				props.history.push('/login');
		}

		return (
				<div className="mt-2">
						Home page content
				</div>
		)
}

export default withRouter(Home);
