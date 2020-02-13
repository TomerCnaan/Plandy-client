import React, { useState, useEffect, Fragment } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import auth from "./services/authService";

//libraries
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components
import ProtectedRoute from "./components/common/protectedRoute";
import NavBar from "./components/navBar";
import HomePage from "./components/homePage";
import Board from "./components/board";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import NotFound from "./components/notFound";

import "./App.css";

function App() {
	useEffect(() => {
		const user = auth.getCurrentUser();
		// TODO: add user to redux store
	});

	return (
		<Fragment>
			<ToastContainer />
			{user ? <NavBar /> : null}
			<main className="container">
				<Switch>
					<Route path="/register" component={RegisterForm} />
					<Route path="/login" component={LoginForm} />
					<Route path="/logout" component={Logout} />
					<ProtectedRoute path="/home-page" component={HomePage} />
					<ProtectedRoute
						path="/board/:id"
						render={props => <Board {...props} />}
					/>
					<Route path="/not-found" component={NotFound} />
					<Redirect from="/" exact to="/home-page" />
					<Redirect to="/not-found" />
				</Switch>
			</main>
		</Fragment>
	);
}

export default App;
