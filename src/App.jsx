import React, { useState, Fragment } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "./actions/todoActions";
import Todos from "./components/todos";
import NavBar from "./components/navBar";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import NotFound from "./components/notFound";

import "./App.css";

function App() {
	return (
		<Fragment>
			<main className="container">
				<Switch>
					<Route path="/register" component={RegisterForm} />
					<Route path="/login" component={LoginForm} />
					<Route path="/logout" component={Logout} />
					{/* TODO: Add main routes */}
					<Route path="/not-found" component={NotFound} />
					<Redirect to="/not-found" />
				</Switch>
			</main>
		</Fragment>
	);
}

export default App;
