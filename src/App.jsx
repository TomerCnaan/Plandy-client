import React, { useEffect, Fragment } from "react";
import auth from "./services/authService";

//libraries
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./actions/userActions";
import { Route, Redirect, Switch } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import _ from "lodash";

//components
import ProtectedRoute from "./components/common/protectedRoute";
import NavBar from "./components/NavBar/navBar";
import HomePage from "./components/homePage";
import Board from "./components/Board/board";
import RegisterForm from "./components/registerForm";
import JoinForm from "./components/joinForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import NotFound from "./components/notFound";
import TeamPage from "./components/teamPage";
import ProfilePage from "./components/profilePage";

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
	const user = useSelector((state) => state.users.user);
	const dispatch = useDispatch();

	useEffect(() => {
		const user = auth.getCurrentUser();
		if (!_.isEmpty(user)) dispatch(setUser({ ...user }));
	}, []);

	return (
		<Fragment>
			<AppWrapper>
				<ToastContainer />
				<Surface>
					<NavBar user={user} />
					<Switch>
						<Route path="/register" component={RegisterForm} />
						<Route path="/join/:token" component={JoinForm} />
						<Route path="/login" component={LoginForm} />
						<Route path="/logout" component={Logout} />
						<ProtectedRoute
							path="/company"
							render={() => <TeamPage user={user} />}
						/>
						<ProtectedRoute
							path="/profile"
							render={() => <ProfilePage user={user} />}
						/>
						<ProtectedRoute
							path="/home-page"
							render={() => <HomePage user={user} />}
						/>
						<ProtectedRoute
							path="/board/:id"
							render={(props) => <Board {...props} />}
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
