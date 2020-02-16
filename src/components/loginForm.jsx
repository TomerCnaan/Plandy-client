import React, { useState } from "react";

// libraried
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";

// components
import useForm from "./common/useForm";
import auth from "../services/authService";
import { blue } from "@material-ui/core/colors";

// style
import { FormWrapper, LeftBanner, RightContent, H1 } from "./style/form-style";
import banner from "../images/form-banner.png";

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
		<FormWrapper>
			<LeftBanner>
				<img src={banner} />
			</LeftBanner>
			<RightContent>
				<H1>Log In</H1>
				<form onSubmit={handleSubmit} noValidate>
					{renderInput("email", "Email")}
					{renderInput("password", "Password", "password")}
					{renderButton("Sign in")}
				</form>
			</RightContent>
		</FormWrapper>
	);
};

export default LoginForm;
