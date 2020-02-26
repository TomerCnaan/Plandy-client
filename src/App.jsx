import React, { useState, useEffect, Fragment } from "react";
import auth from "./services/authService";

//libraries
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./actions/userActions";
import { Route, Redirect, Switch } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";

//components
import ProtectedRoute from "./components/common/protectedRoute";
import NavBar from "./components/navBar";
import HomePage from "./components/homePage";
import Board from "./components/board";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import NotFound from "./components/notFound";

// style
import GlobalStyle from "./global-styles";
import "react-toastify/dist/ReactToastify.css";

const AppWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	position: relative;
`;

const Surface = styled.div`
	position: absolute;
	background-color: #353761;
	z-index: 1;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
`;

function App() {
	// redux set up
	// const user = useSelector(state => state.users.user);
	// const dispatch = useDispatch();

	const [user, setUser] = useState("");

	useEffect(() => {
		// dispatch(setUser({ ...auth.getCurrentUser() }));
		// setUser({ ..._user });
		const user = auth.getCurrentUser();
		setUser(user);
	}, []);

	return (
		<Fragment>
			<AppWrapper>
				<ToastContainer />
				<Surface>
					<NavBar user={user} />
					<Switch>
						<Route path="/register" component={RegisterForm} />
						<Route path="/login" component={LoginForm} />
						<Route path="/logout" component={Logout} />
						<ProtectedRoute path="/home-page" component={HomePage} />
						<ProtectedRoute
							path="/board/:id"
							render={props => <Board {...props} />}
						/>
						{/* TODO: add missing routes */}
						<Route path="/not-found" component={NotFound} />
						<Redirect from="/" exact to="/home-page" />
						<Redirect to="/not-found" />
					</Switch>
					<GlobalStyle />
				</Surface>
			</AppWrapper>
		</Fragment>
	);
}

export default App;
