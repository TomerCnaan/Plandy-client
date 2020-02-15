import React, { useState } from "react";

// libraried
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";

// components
import useForm from "./common/useForm";
import auth from "../services/authService";

const INTITIAL_STATE = {
	email: "",
	password: ""
};

const LoginForm = () => {
	const schema = {
		email: Joi.string()
			.required()
			.email()
			.label("Email"),
		password: Joi.string()
			.required()
			.label("Password")
	};

	const doSubmit = async () => {
		console.log("submitted");
	};

	const { handleSubmit, renderInput, renderButton } = useForm(
		INTITIAL_STATE,
		schema,
		doSubmit
	);

	if (auth.getCurrentUser()) return <Redirect to="/" />;
	return (
		<div>
			<h1> Login Form!!!</h1>
			<form onSubmit={handleSubmit} noValidate>
				{renderInput("email", "Email")}
				{renderInput("password", "Password", "password")}
				{renderButton("Sign in")}
			</form>
		</div>
	);
};

export default LoginForm;
