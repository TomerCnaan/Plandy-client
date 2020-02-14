import React from "react";

// libraried
import { Redirect } from "react-router-dom";
import joi, { fromByteArray } from "joi-browser";

// components
import Form from "./common/form";
import auth from "../services/authService";

const LoginForm = () => {
	return (
		<div>
			<h1> Login Form!!!</h1>
		</div>
	);
};

export default LoginForm;
