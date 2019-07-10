import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StateProvider } from './contexts/state-context';
import Layout from './components/Layout/Layout';
import Routes from './Routes';
import './App.css';

const App = () => {

	const initialState = {
		token: null,
		userId: null,
	};

	const reducer = (state, action) => {
		switch (action.type) {
			case 'login':
				return {
					...state,
					token: action.token,
					userId: action.userId,
					email: action.email
				};
			
			case 'logout':
				return {
					...state,
					token: null,
					userId: null
				};

			default:
				return state;
		}
	};

	return (
		<BrowserRouter>
			<StateProvider initialState={initialState} reducer={reducer}>
				<Layout>
					<Routes />
				</Layout>
			</StateProvider>
		</BrowserRouter>
	);
}

export default App;
